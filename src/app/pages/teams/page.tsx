'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/app/server/supabaseClient';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    initials: string;
    status: 'active' | 'inactive';
    completed_tasks: number;
    in_progress_tasks: number;
    performance: number;
}

export default function TeamPage() {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
        // Dummy data for testing
        { id: 1, name: 'Sarah Johnson', role: 'Manager', initials: 'SJ', status: 'active', completed_tasks: 34, in_progress_tasks: 5, performance: 92 },
        { id: 2, name: 'Mike Williams', role: 'Developer', initials: 'MW', status: 'active', completed_tasks: 28, in_progress_tasks: 8, performance: 85 },
        { id: 3, name: 'Emily Davis', role: 'Designer', initials: 'ED', status: 'active', completed_tasks: 31, in_progress_tasks: 4, performance: 88 },
        { id: 4, name: 'David Brown', role: 'Developer', initials: 'DB', status: 'active', completed_tasks: 22, in_progress_tasks: 6, performance: 78 },
        { id: 5, name: 'Lisa Anderson', role: 'Manager', initials: 'LA', status: 'inactive', completed_tasks: 42, in_progress_tasks: 3, performance: 95 },
    ]);

    const [newMember, setNewMember] = useState({
        name: '',
        role: '',
        initials: '',
        status: 'active' as const,
        completed_tasks: 0,
        in_progress_tasks: 0,
        performance: 0,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fetch team members from Supabase
    // useEffect(() => {
    //     fetchTeamMembers();
    // }, []);

    const fetchTeamMembers = async () => {
        const { data, error } = await supabase
            .from('team_members')
            .select('*')
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching team members:', error);
        } else {
            setTeamMembers(data as TeamMember[]);
        }
    };

    // Calculate total stats
    const totalMembers = teamMembers.length;
    const activeMembers = teamMembers.filter(m => m.status === 'active').length;
    const totalCompleted = teamMembers.reduce((sum, m) => sum + m.completed_tasks, 0);
    const totalInProgress = teamMembers.reduce((sum, m) => sum + m.in_progress_tasks, 0);
    const avgPerformance = teamMembers.length > 0 
        ? Math.round(teamMembers.reduce((sum, m) => sum + m.performance, 0) / teamMembers.length) 
        : 0;

    const handleAddMember = async () => {
        const { data, error } = await supabase
            .from('team_members')
            .insert([
                {
                    name: newMember.name,
                    role: newMember.role,
                    initials: newMember.initials,
                    status: newMember.status,
                    completed_tasks: newMember.completed_tasks,
                    in_progress_tasks: newMember.in_progress_tasks,
                    performance: newMember.performance,
                }
            ])
            .select();

        if (error) {
            console.error('Error adding team member:', error);
            alert('Error adding team member: ' + error.message);
        } else {
            setTeamMembers([...teamMembers, data[0]]);
            setNewMember({
                name: '',
                role: '',
                initials: '',
                status: 'active',
                completed_tasks: 0,
                in_progress_tasks: 0,
                performance: 0,
            });
            setIsDialogOpen(false);
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'active' ? 'bg-green-500' : 'bg-gray-400';
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'manager':
                return 'bg-gray-100';
            case 'developer':
                return 'bg-green-100';
            case 'designer':
                return 'bg-yellow-100';
            default:
                return 'bg-gray-100';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl">Our Team</CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add Member
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Team Member</DialogTitle>
                                    <DialogDescription>Add a new member to your team</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="member-name">Name</Label>
                                        <Input
                                            id="member-name"
                                            value={newMember.name}
                                            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-role">Role</Label>
                                        <Input
                                            id="member-role"
                                            value={newMember.role}
                                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                            placeholder="Developer"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-initials">Initials</Label>
                                        <Input
                                            id="member-initials"
                                            value={newMember.initials}
                                            onChange={(e) => setNewMember({ ...newMember, initials: e.target.value.toUpperCase() })}
                                            placeholder="JD"
                                            maxLength={2}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-status">Status</Label>
                                        <Select
                                            value={newMember.status}
                                            onValueChange={(value) => setNewMember({ ...newMember, status: value as any })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-completed">Completed Tasks</Label>
                                        <Input
                                            id="member-completed"
                                            type="number"
                                            value={newMember.completed_tasks}
                                            onChange={(e) => setNewMember({ ...newMember, completed_tasks: parseInt(e.target.value) || 0 })}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-progress">In Progress Tasks</Label>
                                        <Input
                                            id="member-progress"
                                            type="number"
                                            value={newMember.in_progress_tasks}
                                            onChange={(e) => setNewMember({ ...newMember, in_progress_tasks: parseInt(e.target.value) || 0 })}
                                            placeholder="0"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="member-performance">Performance (%)</Label>
                                        <Input
                                            id="member-performance"
                                            type="number"
                                            value={newMember.performance}
                                            onChange={(e) => setNewMember({ ...newMember, performance: parseInt(e.target.value) || 0 })}
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleAddMember}>Add Member</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="text-sm text-gray-500 mb-1">Team Members</div>
                                <div className="text-2xl font-medium">{totalMembers}</div>
                                <div className="text-xs text-gray-400 mt-1">{activeMembers} active</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="text-sm text-gray-500 mb-1">Completed</div>
                                <div className="text-2xl font-medium">{totalCompleted}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="text-sm text-gray-500 mb-1">In Progress</div>
                                <div className="text-2xl font-medium">{totalInProgress}</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white">
                            <CardContent className="p-6">
                                <div className="text-sm text-gray-500 mb-1">Performance</div>
                                <div className="text-2xl font-medium">{avgPerformance}%</div>
                            </CardContent>
                        </Card>
                    </div>
                </CardHeader>

                <CardContent>
                    <h3 className="text-lg font-medium mb-4">Team Members</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {teamMembers.map((member) => (
                            <Card key={member.id} className="bg-white">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className={`w-12 h-12 rounded-full ${getRoleColor(member.role)} flex items-center justify-center text-gray-700 font-medium`}>
                                            {member.initials}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-gray-900">{member.name}</h4>
                                                <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`}></div>
                                            </div>
                                            <p className="text-sm text-gray-500">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Completed</span>
                                            <span className="font-medium">{member.completed_tasks}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">In Progress</span>
                                            <span className="font-medium">{member.in_progress_tasks}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Performance</span>
                                            <span className="font-medium">{member.performance}%</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}