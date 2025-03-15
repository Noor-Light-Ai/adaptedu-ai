
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set')
    }

    // Parse request body
    const { pdfContent, prompt, options } = await req.json()

    if (!pdfContent) {
      throw new Error('PDF content is required')
    }

    console.log('Analyzing PDF with options:', options)

    // Create system prompt that instructs OpenAI to analyze the PDF
    const systemPrompt = `
You are an expert course creator that analyzes educational material and creates structured courses.
You will analyze the content from a PDF and the user's requirements to create a well-structured course.
Follow these guidelines:
- Create a comprehensive course structure based on the PDF content and user's prompt
- Include learning objectives that clearly define what students will learn
- Generate an estimated duration for the course based on content complexity
- Organize content into logical sections with clear headings
${options.includeQuizzes ? '- Include knowledge check quizzes at appropriate points' : ''}
${options.includeAssignments ? '- Add practical assignments that help apply the knowledge' : ''}
${options.includeImages ? '- Suggest points where images would enhance understanding (these will be added later)' : ''}
    `

    // Prepare the user message with PDF content and prompt
    const userMessage = `
Here is the content extracted from a PDF:
\`\`\`
${pdfContent}
\`\`\`

User's requirements: ${prompt}

Generate a complete course based on this content and the user's requirements.
Your response should be in JSON format with the following structure:
{
  "title": "Course Title",
  "description": "Course description",
  "estimatedDuration": "Estimated duration (e.g., '1.5 hours')",
  "learningObjectives": ["objective1", "objective2", ...],
  "sections": [
    {
      "id": "unique_id",
      "type": "header|subheader|paragraph|image|quiz|assignment",
      "content": "Content of the section"
    },
    ...
  ]
}

For quiz sections, use this format for content:
{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answerIndex": 0 // Index of the correct answer (0-based)
}
    `

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const generatedContent = data.choices[0].message.content

    console.log('Successfully generated course content')

    // Try to parse the response as JSON
    let parsedContent
    try {
      // Extract JSON if it's wrapped in markdown code blocks
      const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)```/) || 
                         generatedContent.match(/```\n([\s\S]*?)```/)
      
      const jsonContent = jsonMatch ? jsonMatch[1] : generatedContent
      parsedContent = JSON.parse(jsonContent)
    } catch (e) {
      console.error('Failed to parse OpenAI response as JSON:', e)
      throw new Error('Failed to parse AI response. Please try again.')
    }

    return new Response(JSON.stringify(parsedContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in analyze-pdf function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
