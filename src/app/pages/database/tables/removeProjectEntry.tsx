'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function RemoveProjectEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const project_id = Number((document.getElementById("project_id") as HTMLInputElement).value);

    if (!project_id) {
      alert("Please enter a valid Project ID.");
      return;
    }

    const { error } = await supabase.from('projects').delete().eq('project_id', project_id);

    if(error) {console.error("Error Removing A Project Entry:", error.message, error.details, error.hint);}

    location.reload();

  };

  return (
    <>
      <input id="project_id" placeholder="Project ID" className="m-5 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"/>
      <Button onClick={removeEntry}>Remove Entry</Button>
    </>
  );
}
