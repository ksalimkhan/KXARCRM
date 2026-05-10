'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function RemovePaymentEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const project_id = Number((document.getElementById("payment_id") as HTMLInputElement).value);

    if (!project_id) {
      alert("Please enter a valid Payment ID.");
      return;
    }

    const { error } = await supabase.from('payments').delete().eq('payment_id', project_id);

    if(error) {console.error("Error Removing A Payment Entry:", error.message, error.details, error.hint);}

    location.reload();

  };

  return (
    <>
      <input id="payment_id" placeholder="Payment ID" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <Button onClick={removeEntry}>Remove Entry</Button>
    </>
  );
}
