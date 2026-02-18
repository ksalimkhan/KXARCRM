'use client';

import { useEffect, useState } from 'react';
import "./tableStyle.css";
import { supabase } from '@/app/server/supabaseClient';

export function ShowPayments () {

    const[payments, setPayments] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const {data, error } = await supabase.from('payments').select('*');

        if (error) {console.error('Error fetching customers: ', error);}
        else {setPayments(data);}
    };

    return (
        <div>
        <h2>Payments</h2>
            <table>
                <thead>
                <tr>
                    <th>Payment ID</th>
                    <th>Customer ID</th>
                    <th>Project ID</th>
                    <th>Amount</th>
                </tr>
                </thead>
                <tbody>
                    {payments.map(payments => (
                        <tr key={payments.payment_id}>
                        <td>{payments.payment_id}</td>
                        <td>{payments.customer_id}</td>
                        <td>{payments.project_id}</td>
                        <td>{payments.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
