'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function RemoveCustomerEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = Number((document.getElementById("customer_id") as HTMLInputElement).value);

    if (!customer_id) {
      alert("Please enter a valid Customer ID.");
      return;
    }

    const { error } = await supabase.from('customers').delete().eq('id', customer_id);

    if(error) {console.error("Error Removing A Customer:", error.message, error.details, error.hint);}

    location.reload();
  };

  return (
    <>
      <input id="customer_id" placeholder="Customer ID" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <Button onClick={removeEntry}>Remove Entry</Button>
    </>
  );
}
