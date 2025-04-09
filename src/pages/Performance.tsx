
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { ArrowLeft, Users, Star, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for the performance metrics
const enrollmentData = [
  { month: 'Jan', enrollments: 420 },
  { month: 'Feb', enrollments: 650 },
  { month: 'Mar', enrollments: 800 },
  { month: 'Apr', enrollments: 720 },
  { month: 'May', enrollments: 910 },
  { month: 'Jun', enrollments: 1100 },
  { month: 'Jul', enrollments: 980 },
  { month: 'Aug', enrollments: 1250 },
  { month: 'Sep', enrollments: 1120 },
  { month: 'Oct', enrollments: 1380 },
  { month: 'Nov', enrollments: 870 },
  { month: 'Dec', enrollments: 968 },
];

const barColors = ['#22c55e', '#3b82f6', '#ec4899', '#f59e0b', '#8b5cf6'];

const rating = (id: string) => {
  const ratings = {
    '1': 4.5,
    '2': 4.3,
    '3': 4.7,
    '4': 4.2,
    '5': 4.6,
    '6': 4.8,
  };
  return ratings[id as keyof typeof ratings] || 4.5;
};

const engagement = (id: string) => {
  const engagements = {
    '1': 78.5,
    '2': 82.1,
    '3': 75.9,
    '4': 84.3,
    '5': 79.7,
    '6': 87.2,
  };
  return engagements[id as keyof typeof engagements] || 80;
};

const totalEnrollments = (id: string) => {
  const enrollments = {
    '1': 8768,
    '2': 5432,
    '3': 7123,
    '4': 4567,
    '5': 6890,
    '6': 3245,
  };
  return enrollments[id as keyof typeof enrollments] || 5000;
};

const courseTitle = (id: string) => {
  const titles = {
    '1': 'Introduction to Machine Learning Concepts',
    '2': 'Digital Marketing for Small Business',
    '3': 'Web Development Fundamentals',
    '4': 'Data Science and Analytics',
    '5': 'Mobile App Development with React Native',
    '6': 'UX/UI Design Principles',
  };
  return titles[id as keyof typeof titles] || 'Course';
};

const PerformancePage = () => {
  const { id = '1' } = useParams<{ id: string }>();
  
  useEffect(() => {
    document.title = `Performance | ${courseTitle(id)}`;
  }, [id]);

  const metrics = [
    { name: 'Total Enrollments', value: totalEnrollments(id), icon: <Users className="h-5 w-5 text-blue-500" /> },
    { name: 'Average Rating', value: rating(id), icon: <Star className="h-5 w-5 text-yellow-500" /> },
    { name: 'Engagement', value: `${engagement(id)}%`, icon: <PieChart className="h-5 w-5 text-green-500" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container max-w-6xl mx-auto pt-28 pb-16 px-6">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <Button variant="ghost" asChild className="mb-3">
              <Link to="/library" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <ArrowLeft className="h-4 w-4" />
                Back to Library
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {courseTitle(id)} - Performance
            </h1>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <Card key={idx}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.name}
                </CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Enrollment Trend Line Chart */}
        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    enrollments: { 
                      color: "#3b82f6", 
                      label: "Enrollments" 
                    },
                    grid: {
                      color: "#e5e7eb",
                    }
                  }}
                >
                  <LineChart data={enrollmentData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip 
                      content={
                        <ChartTooltipContent />
                      }
                    />
                    <Line 
                      type="monotone" 
                      dataKey="enrollments" 
                      name="Enrollments"
                      stroke="var(--color-enrollments)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Legend />
                  </LineChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Monthly Engagement Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip 
                    content={
                      <ChartTooltipContent />
                    }
                  />
                  <Bar dataKey="enrollments" name="Engagement Rate">
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                    ))}
                  </Bar>
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PerformancePage;
