'use client';

import {supabase} from "@/app/server/supabaseClient"

import { useEffect, useState, type MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

type Customer = {
  id: number;
  first_name: string;
  last_name: string;
};

export default function AddPaymentEntry() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  
  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("id, first_name, last_name")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching customers:", error.message);
        return;
      }

      setCustomers(data || []);
    };

    fetchCustomers();
  }, []);

  const processData = async(
    customer_id: number,
    project_type: string,
    notes: string,
    status: string,
    due_date: string,
  ) => {
    const {data: { user }, error: userError,} = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No signed-in user found:", userError?.message);
      return {error: userError, data: null};
    }
    
    const {data, error} = await supabase.from("projects").insert({
      customer_id,
      project_type,
      notes,
      status,
      due_date,
    });

    if(error) {console.error("Error inserting a project:", error.message, error.details, error.hint);}
    else {console.log("Project added:", data);}

    return {error, data};
  };

  const addEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = Number((document.getElementById("new_customer_id") as HTMLInputElement).value);
    const project_type = (document.getElementById("new_project_type") as HTMLInputElement).value;
    const notes = (document.getElementById("new_notes") as HTMLInputElement).value;
    const status = (document.getElementById("new_status") as HTMLInputElement).value;
    const due_date = (document.getElementById("new_due_date") as HTMLInputElement).value;

    if (!customer_id || !project_type || !status || !due_date) {
      alert("Please fill out all required fields.");
      return;
    }

    const result = await processData(
      customer_id,
      project_type,
      notes,
      status,
      due_date,
    );

    if (result.error) return;

    location.reload();
  };

  return (
    <>
      <select id="new_customer_id" defaultValue=""
       className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600">
        <option value="" disabled>
          Select Customer
        </option>

        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>
            {customer.id} - {customer.first_name} {customer.last_name}
          </option>
        ))}
      </select>
      <input id="new_project_type" placeholder="Project Type" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <input id="new_notes" placeholder="Notes" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <input id="new_status" placeholder="Status" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <input id="new_due_date" type="date" placeholder="Due Date" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <Button onClick={addEntry}>Add Entry</Button>
    </>
  );
}
