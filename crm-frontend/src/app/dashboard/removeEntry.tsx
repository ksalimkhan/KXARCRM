'use client'

import {supabase} from "@/lib/supabaseClient"
import type { MouseEvent } from "react";
import { processData } from "@/lib/processData";
import "./pageStyle.css";

export default function RemoveEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const first_name = (document.getElementById("first_name") as HTMLInputElement).value;

    const { error } = await supabase.from('customers').delete().eq('first_name', first_name);

    if(error) {
      console.error('Error Removing An Entry');
    }

    location.reload();
  };

  return (
    <>
      <input id="first_name" placeholder="First Name" />
      <button className = "tab" onClick={removeEntry}>Remove Entry</button>
    </>
  );
}
