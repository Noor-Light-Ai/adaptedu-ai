
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Calendar, File, MoreHorizontal, PlusCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  createdAt: string;
  duration: string;
  sections: number;
}

interface DashboardProps {
  courses: Course[];
}

const Dashboard = ({ courses }: DashboardProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Your Courses</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and view your created courses
          </p>
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full sm:w-[240px]"
            />
          </div>
          
          <Button asChild>
            <Link to="/create" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create
            </Link>
          </Button>
        </div>
      </div>
      
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <File className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">No courses found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {searchQuery 
              ? "No courses match your search criteria" 
              : "You don't have any courses yet"}
          </p>
          <Button asChild>
            <Link to="/create" className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Course
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <Link to={`/preview/${course.id}`} className="block">
                <div className="h-48 bg-gray-100 dark:bg-gray-800 relative">
                  {course.coverImage ? (
                    <img 
                      src={course.coverImage} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
                      <BookOpen className="h-12 w-12 text-blue-500/40" />
                    </div>
                  )}
                </div>
              </Link>
              
              <CardContent className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <Link to={`/preview/${course.id}`} className="block">
                      <h3 className="font-medium text-gray-900 dark:text-gray-50 line-clamp-1 hover:text-blue-500 transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link to={`/preview/${course.id}`} className="flex w-full">
                          View Course
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Course</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-500 dark:text-red-400">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
              
              <CardFooter className="px-5 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-between">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="h-3 w-3 mr-1" />
                  {course.createdAt}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
