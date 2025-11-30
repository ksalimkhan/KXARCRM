'use client'

import {supabase} from "@/app/server/supabaseClient"
import type { MouseEvent } from "react";
import { processData } from "@/app/server/processData";
import "./pageStyle.css";

export default function RemoveEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = (document.getElementById("customer_id") as HTMLInputElement).value;

    const { error } = await supabase.from('customers').delete().eq('id', customer_id);

    if(error) {
      console.error('Error Removing An Entry');
    }

    location.reload();
  };

  return (
    <>
      <input id="customer_id" placeholder="Customer ID" />
      <button className = "tab" onClick={removeEntry}>Remove Entry</button>
    </>
  );
}
