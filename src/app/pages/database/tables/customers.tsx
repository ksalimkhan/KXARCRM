'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/server/supabaseClient';

import AddCustomerEntry from "./addCustomerEntry";
import RemoveCustomerEntry from "./removeCustomerEntry";

import "./tableStyle.css";

interface Customer {
    id: number;
    first_name: string | null;
    last_name: string | null;
    email_address: string | null;
    phone_number: string | null;
    address: string | null;
    notes: string | null;
}

export function ShowCustomers () {

    const[customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const {
            data: {user},
        } = await supabase.auth.getUser();

        if (!user) {
            console.error("No user found");
            return;
        }

        const {data, error } = await supabase
        .from('customers')
        .select('*')

        if (error) {
            console.error('Error fetching customers: ', error);
        }
        else {
            setCustomers(data);}
    };

    return (
        <div>
        <h2>Customers</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Notes</th>
                </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.email_address}</td>
                        <td>{customer.phone_number}</td>
                        <td>{customer.address}</td>
                        <td>{customer.notes}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modifier">
                <AddCustomerEntry />
            </div>

            <div className="modifier">
                <RemoveCustomerEntry />
            </div>
        </div>
    );
}
