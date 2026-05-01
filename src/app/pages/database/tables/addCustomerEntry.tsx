'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function AddCustomerEntry() {

  const processData = async(
    first_name: string,
    last_name: string,
    email_address: string,
    phone_number: string,
    address: string,
    notes: string,
  ) => {
    const {data: { user }, error: userError,} = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("No signed-in user found:", userError?.message);
      return {error: userError, data: null};
    }
    const {data, error} = await supabase.from("customers").insert({
      first_name,
      last_name,
      email_address,
      phone_number,
      address,
      notes,
    });

    if(error) {console.error("Error inserting a customer:", error.message, error.details, error.hint);}
    else {console.log("Customer added:", data);}

    return {error, data};
  }

  const addEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const first_name = (document.getElementById("new_first_name") as HTMLInputElement).value;
    const last_name = (document.getElementById("new_last_name") as HTMLInputElement).value;
    const email_address = (document.getElementById("new_email_address") as HTMLInputElement).value;
    const phone_number = (document.getElementById("new_phone_number") as HTMLInputElement).value;
    const address = (document.getElementById("new_address") as HTMLInputElement).value;
    const notes = (document.getElementById("new_notes") as HTMLInputElement).value;

    await processData(
      first_name,
      last_name,
      email_address,
      phone_number,
      address,
      notes,
    );

    location.reload();
  };

  return (
    <>
      <input id="new_first_name" placeholder="First Name" />
      <input id="new_last_name" placeholder="Last Name" />
      <input id="new_email_address" placeholder="Email Address" />
      <input id="new_phone_number" placeholder="Phone Number" />
      <input id="new_address" placeholder="Address" />
      <input id="new_notes" placeholder="Notes" />
      <Button onClick={addEntry}>Add Entry</Button>
    </>
  );
}
