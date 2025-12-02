'use client';

import { useEffect, useState } from 'react';
import "./tableStyle.css";
import { supabase } from '@/app/server/supabaseClient';

export function ShowProjects () {

    const[projects, setProjects] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const {data, error } = await supabase.from('projects').select('*');

        if (error) {console.error('Error fetching customers: ', error);}
        else {setProjects(data);}
    };

    return (
        <div>
        <h2>Payments</h2>
            <table>
                <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Customer ID</th>
                    <th>Type</th>
                    <th>Notes</th>
                    <th>Status</th>
                    <th>Due Date</th>
                </tr>
                </thead>
                <tbody>
                    {projects.map(projects => (
                        <tr key={projects.project_id}>
                            <td>{projects.project_id}</td>
                            <td>{projects.customer_id}</td>
                            <td>{projects.type}</td>
                            <td>{projects.notes}</td>
                            <td>{projects.status}</td>
                            <td>{projects.due_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
