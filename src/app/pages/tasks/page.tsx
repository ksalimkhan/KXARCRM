'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Calendar, User, Trash } from 'lucide-react';
import { supabase } from '@/app/server/supabaseClient';

//Skeleton Code for a Task
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


export default function Tasks() {
    //Pushes default Tasks to board
    const [tasks, setTasks] = useState<Task[]>([
        //Dummy Data for testing
        // { id: 1, title: 'Follow up with John Smith', description: 'Send proposal document', assignee: 'You', due_date: '2025-11-01', priority: 'high', status: 'pending', customer_id: 'Acme Corp' },
        // { id: 2, title: 'Schedule demo call', description: 'Product demo for TechStart', assignee: 'Sarah', due_date: '2025-11-02', priority: 'medium', status: 'in-progress', customer_id: 'TechStart Inc' },
        // { id: 3, title: 'Prepare contract', description: 'Draft and review contract', assignee: 'You', due_date: '2025-11-05', priority: 'high', status: 'pending', customer_id: 'Global Solutions' },
        // { id: 4, title: 'Send thank you email', description: 'Follow up after meeting', assignee: 'Mike', due_date: '2025-10-31', priority: 'low', status: 'completed', customer_id: 'Innovation Labs' },
        // { id: 5, title: 'Update CRM records', description: 'Add meeting notes', assignee: 'You', due_date: '2025-11-03', priority: 'medium', status: 'in-progress', customer_id: 'Future Tech' },
    ]);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignee: '',
        due_date: '',
        priority: 'medium' as const,
        status: 'pending' as const,
        customer_id: '',
    });

    
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

    //Can remove if not needed
    const [priorityFilter, setPriorityFilter] = useState<'all' |'high' | 'medium' | 'low'>('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    // Old method for filtering tasks by status only
    // const filteredTasks = statusFilter === 'all' ? tasks : tasks.filter(task => task.status === statusFilter);

    const filteredTasks = tasks.filter(task => {
        const matchStatus = statusFilter === 'all' || task.status === statusFilter;
        const matchPriority = priorityFilter === 'all' || task.priority === priorityFilter;
        return matchStatus && matchPriority;
    })
    //Fetches tasks from Supabase and displays them
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

    const handleDeleteTask = async (taskId: number) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

        if(error) {
            console.error('Error deleting task:', error);
            alert('Error deleting task.' + error.message);
        } else {
            setTasks(tasks.filter(task => task.id !== taskId));
        }

    };

    const handleAddTask = async () => {
        const customerIdSent = newTask.customer_id === '' ? null : Number(newTask.customer_id);
        const{data, error} = await supabase
        .from('tasks')
        .insert([
        // const task: Task = {
        // id: tasks.length + 1,
        // //Takes in whatever the user inputs and puts it in new Task
        // ...newTask,
        // };
        // //Adds new task to task list
        // setTasks([...tasks, task]);
        // //Resets Form to Empty
        // setNewTask({
        {
            title: newTask.title,
            description: newTask.description,
            assignee: newTask.assignee,
            due_date: newTask.due_date,
            priority: newTask.priority,
            status: newTask.status,
            customer_id: newTask.customer_id,
        }
        ])
        //Returns New Task into database
        .select()
        //Popup diasappears
        if(error) {
            console.error('Error adding task:', error);
            alert('Error adding task.' + error.message);
        } else {
            //Updates UI with data from DB
            setTasks([...tasks, data[0]]);
            setNewTask({
                title: '',
                description: '',
                assignee: '',
                due_date: '',
                priority: 'medium',
                status: 'pending',
                customer_id: '',
            })
            setIsDialogOpen(false);
        }
    };

    const toggleTaskStatus = (taskId: number) => {
        setTasks(tasks.map(task => {
        if (task.id === taskId) {
            return {
            ...task,
            status: task.status === 'completed' ? 'pending' : 'completed'
            };
        }
        return task;
        }));
        setStatusFilter('all');
    };

    //Gets total of tasks for that case
    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    const handlePriortyFilterChange = (value: string) => {
        setPriorityFilter(value as 'all' | 'low' | 'medium' | 'high');
        setStatusFilter('all');
    };

    const handleStatusFilterChange = (value: string) => {
        setStatusFilter(value as 'all' | 'pending' | 'in-progress' | 'completed');
        setPriorityFilter('all');
    };

    return (
        
        <div className="space-y-6 p-6">
        {/* Displays Stats at the top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
                <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Total Tasks</p>
                    <p className="text-2xl text-gray-900 mt-1">{taskStats.total}</p>
                </CardContent>
            </Card>
            <Card className="bg-accent-foreground/4">
                <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl text-gray-900 mt-1">{taskStats.pending}</p>
                </CardContent>
            </Card>
            <Card className="bg-blue-400/15">
                <CardContent className="p-6">
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="text-2xl text-gray-900 mt-1">{taskStats.inProgress}</p>
                </CardContent>
            </Card>
            <Card className="bg-green-50">
                <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl text-green-600 mt-1">{taskStats.completed}</p>
                </CardContent>
            </Card>
        </div>

        {/* Tasks List */}
        <Card>
            <CardHeader>
            <div className="flex items-center justify-between">
                <div>
                <CardTitle>Tasks</CardTitle>
                <CardDescription>Manage your to-do list and activities</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                {/* Select Menu for Filtering Tasks */}
                <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                    <SelectTrigger className="w-40">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">
                            <Badge className={getStatusColor("pending")}>
                                {{pending: 'Pending', 'in-progress': 'In Progress', completed: 'Completed'}["pending"]}
                            </Badge>
                        </SelectItem>
                        <SelectItem value="in-progress">
                            <Badge className={getStatusColor("in-progress")}>
                                {{pending: 'Pending', 'in-progress': 'In Progress', completed: 'Completed'}["in-progress"]}
                            </Badge>
                        </SelectItem>
                        <SelectItem value="completed">
                            <Badge className={getStatusColor("completed")}>
                                {{pending: 'Pending', 'in-progress': 'In Progress', completed: 'Completed'}["completed"]}
                            </Badge>
                        </SelectItem>
                    </SelectContent>
                </Select>
                
                {/* Select Menu for Filtering Tasks */}
                <Select value={priorityFilter} onValueChange={handlePriortyFilterChange}>
                    <SelectTrigger className="w-40">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">
                            <Badge className={getPriorityColor("high")}>
                                {{low: 'Low', medium: 'Medium', high: 'High'}["high"]}
                            </Badge>
                        </SelectItem>
                        <SelectItem value="medium">
                            <Badge className={getPriorityColor("medium")}>
                                {{low: 'Low', medium: 'Medium', high: 'High'}["medium"]}
                            </Badge>
                        </SelectItem>
                        <SelectItem value="low">
                            <Badge className={getPriorityColor("low")}>
                                {{low: 'Low', medium: 'Medium', high: 'High'}["low"]}
                            </Badge>
                        </SelectItem>
                    </SelectContent>
                </Select>

                

                {/* Dialog Box to add a new task */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Add Task
                    </Button>
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Task</DialogTitle>
                        <DialogDescription>Create a new task to track</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                        <Label htmlFor="task-title">Title</Label>
                        <Input
                            id="task-title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                            placeholder="Follow up with customer"
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-description">Description</Label>
                        <Textarea
                            id="task-description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                            placeholder="Add task details..."
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-assignee">Assignee</Label>
                        <Input
                            id="task-assignee"
                            value={newTask.assignee}
                            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                            placeholder="You"
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-related">Related To</Label>
                        <Input
                            id="task-related"
                            value={newTask.customer_id}
                            onChange={(e) => setNewTask({ ...newTask, customer_id: e.target.value })}
                            placeholder="Company or Contact"
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-date">Due Date</Label>
                        <Input
                            id="task-date"
                            type="date"
                            value={newTask.due_date}
                            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-priority">Priority</Label>
                        <Select
                            value={newTask.priority}
                            onValueChange={(value) => setNewTask({ ...newTask, priority: value as any })}
                        >
                            <SelectTrigger>
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-status">Status</Label>
                        <Select
                            value={newTask.status}
                            onValueChange={(value) => setNewTask({ ...newTask, status: value as any })}
                        >
                            <SelectTrigger>
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddTask}>Add Task</Button>
                    </DialogFooter>
                    </DialogContent>
                </Dialog>
                </div>
            </div>
            </CardHeader>

            <CardContent>
            <div className="space-y-3">
                {filteredTasks.map((task) => (
                <div
                    key={task.id}
                    className="flex items-start gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                >
                    <Checkbox
                        checked={task.status === 'completed'}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mt-1"
                    />
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
                            <Button 
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteTask(task.id)}
                            >
                                <Trash className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(task.due_date).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">Related: {task.customer_id}</div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </CardContent>
        </Card>
        </div>
    );
}
