
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
    const { pdfText, analysis, formData } = await req.json()

    console.log('Generating course with options:', formData)

    // Create system prompt for final course generation
    const systemPrompt = `
You are an expert course creation AI that takes PDF content and user requirements to create engaging learning experiences.
You will use the provided PDF analysis and generate a final, refined course structure.

Follow these guidelines:
- Use the analysis to create a polished, well-structured course
- Ensure all sections flow logically and build on previous knowledge
- Include clear learning objectives
- Generate realistic content for each section
${formData.includeQuizzes ? '- Include engaging quizzes that test knowledge at key points' : ''}
${formData.includeAssignments ? '- Add practical assignments that apply the learned concepts' : ''}
${formData.includeImages ? '- Include image suggestions where visual aids would enhance learning' : ''}
    `

    // Send the entire PDF content and analysis to OpenAI for the final course creation
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
          { 
            role: 'user', 
            content: `
Here's the PDF content I've extracted:
\`\`\`
${pdfText.substring(0, 10000)} // Limiting to 10000 chars for API limits
\`\`\`

Here's the initial analysis:
\`\`\`
${JSON.stringify(analysis, null, 2)}
\`\`\`

User's requirements: ${formData.prompt}

Generate a final, polished course based on this analysis. Make it engaging and educational.
Return a JSON object with the following structure:
{
  "title": "Course Title",
  "description": "Course description (2-3 sentences)",
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

For quiz sections, use this structure for content:
{
  "question": "Question text",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "answerIndex": 0 // Index of the correct answer (0-based)
}

For image sections, provide a descriptive prompt that could be used to generate an image.
`
          }
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
    let generatedContent = data.choices[0].message.content

    console.log('Successfully generated course')

    // Try to parse the response as JSON
    let courseData
    try {
      // Extract JSON if it's wrapped in code blocks
      const jsonMatch = generatedContent.match(/```json\n([\s\S]*?)```/) || 
                         generatedContent.match(/```\n([\s\S]*?)```/)
      
      const jsonContent = jsonMatch ? jsonMatch[1] : generatedContent
      courseData = JSON.parse(jsonContent)
    } catch (e) {
      console.error('Failed to parse OpenAI response as JSON:', e)
      throw new Error('Failed to parse course data. Please try again.')
    }

    // Add mock image URLs for image sections
    if (formData.includeImages) {
      courseData.sections = courseData.sections.map(section => {
        if (section.type === 'image') {
          return {
            ...section,
            content: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop"
          }
        }
        return section
      })
    }

    return new Response(JSON.stringify(courseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in generate-course function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
