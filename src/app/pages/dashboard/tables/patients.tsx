'use client';

import { useEffect, useState } from 'react';
import "./tableStyle.css";
import { supabase } from '@/app/server/supabaseClient';

export function ShowPatients () {

    const[patients, setPatients] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const {data, error } = await supabase.from('patients').select('*');

        if (error) {console.error('Error fetching customers: ', error);}
        else {setPatients(data);}
    };

    return (
        <div>
        <h2>Patients</h2>
            <table>
                <thead>
                <tr>
                    <th>Patient ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Visit Reason</th>
                    <th>Visit Date</th>
                </tr>
                </thead>
                <tbody>
                    {patients.map(patients => (
                        <tr key={patients.patient_id}>
                            <td>{patients.patient_id}</td>
                            <td>{patients.first_name}</td>
                            <td>{patients.last_name}</td>
                            <td>{patients.visit_reason}</td>
                            <td>{patients.visit_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
