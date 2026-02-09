'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-calendar';
import './calendar.css'; // Important for styles
import { supabase } from '@/app/server/supabaseClient';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';


export default function ShowCalendar() {
    interface Task {
    id: number;
    title: string;
    description: string;
    assignee: string;
    due_date: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    customer_id: string;
    }

    const [tasks, setTasks] = useState<Task[]>([
    ]);
    
    const [date, setValue] = useState(new Date());

    const handleDateChange = (date) => {
        setValue(date); // Update the selected date
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'low':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    //Based on case, shows corresponding color
    const getStatusColor = (status: string) => {
        switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'in-progress':
            return 'bg-blue-100 text-blue-800';
        case 'pending':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
            const {data, error } = await supabase
            .from('tasks')
            .select('*')
            .order('id', { ascending: true });
    
            if (error) {
                console.error('Error fetching tasks:', error);
            } else {
                
                setTasks(data as Task[]);
            }
        };

    const filteredTasks = tasks.filter(task => task.due_date == date.toISOString().substring(0,10))
    
    //Tasks setup for highlighting dates
    const tileTasks = new Set(tasks.map(task => task.due_date))

    // Function used for highlighting dates w/ tasks due
    function tileClassName({ date, view }) {
        if (view === 'month') {
            const formattedDate = date.toISOString().substring(0,10)
            if(tileTasks.has(formattedDate))
                return 'highlight'
        }
    }

    return (
        <div>
        <h1>Select a Date</h1>
        <Calendar onChange={handleDateChange} 
            // Calls tileClassName function to determine what dates have tasks due and should be highlighted
            tileClassName={tileClassName}
            value={date}
        />

        {filteredTasks.map((task) => (
                <div
                    key={task.id}
                    className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                    <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                        <div>
                        <h4 className={`text-gray-900 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge className={getPriorityColor(task.priority)}>
                                {task.priority}
                            </Badge>
                            <Badge className={getStatusColor(task.status)}>
                                {task.status}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                            {/* <Calendar className="w-4 h-4" /> */}
                            {new Date(task.due_date).toISOString().substring(0,10)}
                        </div>
                        <div className="text-gray-500">Related: {task.customer_id}</div>
                    </div>
                    </div>
                </div>
                ))}
        </div>
    );
}
