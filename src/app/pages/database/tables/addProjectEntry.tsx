'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function AddProjectEntry() {

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
  }

  const addEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = (document.getElementById("new_customer_id") as HTMLInputElement).value;
    const project_type = (document.getElementById("new_project_type") as HTMLInputElement).value;
    const notes = (document.getElementById("new_notes") as HTMLInputElement).value;
    const status = (document.getElementById("new_status") as HTMLInputElement).value;
    const due_date = (document.getElementById("new_due_date") as HTMLInputElement).value;

    await processData(
      customer_id,
      project_type,
      notes,
      status,
      due_date,
    );

    location.reload();
  };

  return (
    <>
      <input id="new_customer_id" placeholder="Customer ID" />
      <input id="new_project_type" placeholder="Project Type" />
      <input id="new_notes" placeholder="Notes" />
      <input id="new_status" placeholder="Status" />
      <input id="new_due_date" placeholder="Due Date" />
      <Button onClick={addEntry}>Add Entry</Button>
    </>
  );
}
