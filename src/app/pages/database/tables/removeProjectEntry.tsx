'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function RemoveProjectEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const project_id = (document.getElementById("project_id") as HTMLInputElement).value;

    const { error } = await supabase.from('projects').delete().eq('project_id', project_id);

    if(error) {console.error("Error Removing A Project Entry:", error.message, error.details, error.hint);}

    location.reload();

  };

  return (
    <>
      <input id="project_id" placeholder="Project ID" />
      <Button onClick={removeEntry}>Remove Entry</Button>
    </>
  );
}
