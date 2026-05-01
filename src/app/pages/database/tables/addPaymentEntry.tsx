'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function AddProjectEntry() {

  const processData = async(
    customer_id: string,
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

    const customer_id = (document.getElementById("new_customer_id") as HTMLInputElement).value;
    const project_id = (document.getElementById("new_project_id") as HTMLInputElement).value;
    const amount = (document.getElementById("new_amount") as HTMLInputElement).value;

    await processData(
      customer_id,
      project_id,
      amount,
    );

    location.reload();
  };

  return (
    <>
      <input id="new_customer_id" placeholder="Customer ID" />
      <input id="new_project_id" placeholder="Project ID" />
      <input id="new_amount" placeholder="Amount" />
      <Button onClick={addEntry}>Add Entry</Button>
    </>
  );
}
