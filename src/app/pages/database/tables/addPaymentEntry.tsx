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

type Project = {
  project_id: number;
  project_type: string;
};

export default function AddPaymentEntry() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data: customersData, error: customersError } = await supabase
        .from("customers")
        .select("id, first_name, last_name")
        .order("id", { ascending: true });

      if (customersError) {
        console.error("Error fetching customers:", customersError.message);
      } else {
        setCustomers(customersData || []);
      }

      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("project_id, project_type")
        .order("project_id", { ascending: true });

      if (projectsError) {
        console.error("Error fetching projects:", projectsError.message);
      } else {
        setProjects(projectsData || []);
      }
    };

    fetchData();
  }, []);

  const processData = async(
    customer_id: number,
    project_id: number,
    amount: string,
  ) => {
    const {data: { user }, error: userError,} = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No signed-in user found:", userError?.message);
      return {error: userError, data: null};
    }

    const {data, error} = await supabase.from("payments").insert({
      customer_id,
      project_id,
      amount,
    });

    if(error) {console.error("Error inserting a payment:", error.message, error.details, error.hint);}
    else {console.log("Payment added:", data);}

    return {error, data};
  }

  const addEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = Number((document.getElementById("new_customer_id") as HTMLInputElement).value);
    const project_id = Number((document.getElementById("new_project_id") as HTMLInputElement).value);
    const amount = (document.getElementById("new_amount") as HTMLInputElement).value;

    if (!customer_id || !project_id || !amount) {
      alert("Please fill out all fields.");
      return;
    }
    
    const result = await processData(
      customer_id,
      project_id,
      amount,
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

      <select id="new_project_id" defaultValue=""
       className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600">
        <option value="" disabled>
          Select Project
        </option>

        {projects.map((project) => (
          <option key={project.project_id} value={project.project_id}>
            {project.project_id} - {project.project_type}
          </option>
        ))}
      </select>
      <input id="new_amount" placeholder="Amount" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <Button onClick={addEntry}>Add Entry</Button>
    </>
  );
}
