'use client';

import { useState } from 'react';
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

//Skeleton Code for a Task
interface Task {
    id: number;
    title: string;
    description: string;
    assignee: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    relatedTo: string;
}


export default function Tasks() {
  //Pushes default Tasks to board
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Follow up with John Smith', description: 'Send proposal document', assignee: 'You', dueDate: '2025-11-01', priority: 'high', status: 'pending', relatedTo: 'Acme Corp' },
    { id: 2, title: 'Schedule demo call', description: 'Product demo for TechStart', assignee: 'Sarah', dueDate: '2025-11-02', priority: 'medium', status: 'in-progress', relatedTo: 'TechStart Inc' },
    { id: 3, title: 'Prepare contract', description: 'Draft and review contract', assignee: 'You', dueDate: '2025-11-05', priority: 'high', status: 'pending', relatedTo: 'Global Solutions' },
    { id: 4, title: 'Send thank you email', description: 'Follow up after meeting', assignee: 'Mike', dueDate: '2025-10-31', priority: 'low', status: 'completed', relatedTo: 'Innovation Labs' },
    { id: 5, title: 'Update CRM records', description: 'Add meeting notes', assignee: 'You', dueDate: '2025-11-03', priority: 'medium', status: 'in-progress', relatedTo: 'Future Tech' },
  ]);

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        priority: 'medium' as const,
        status: 'pending' as const,
        relatedTo: '',
    });

    const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

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

    const handleAddTask = () => {
        const task: Task = {
        id: tasks.length + 1,
        //Takes in whatever the user inputs and puts it in new Task
        ...newTask,
        };
        //Adds new task to task list
        setTasks([...tasks, task]);
        //Resets Form to Empty
        setNewTask({
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        priority: 'medium',
        status: 'pending',
        relatedTo: '',
        });
        //Popup diasappears
        setIsDialogOpen(false);
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
        setFilter('all');
    };

    //Gets total of tasks for that case
    const taskStats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
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
            <Card>
                <CardContent className="p-6">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl text-gray-900 mt-1">{taskStats.pending}</p>
                </CardContent>
            </Card>
            <Card>
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
                <div className="flex items-center gap-2">
                {/* Select Menu for Filtering Tasks */}
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                    <SelectTrigger className="w-40">
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Tasks</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
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
                            id="task-rzelated"
                            value={newTask.relatedTo}
                            onChange={(e) => setNewTask({ ...newTask, relatedTo: e.target.value })}
                            placeholder="Company or Contact"
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="task-date">Due Date</Label>
                        <Input
                            id="task-date"
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
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
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {task.assignee}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(task.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">Related: {task.relatedTo}</div>
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
