'use client'

import type { MouseEvent } from "react";
import { processData } from "@/lib/processData";

export default function AddEntry() {
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
      notes
    );
  };

  return (
    <>
      <input id="new_first_name" placeholder="First Name" />
      <input id="new_last_name" placeholder="Last Name" />
      <input id="new_email_address" placeholder="Email Address" />
      <input id="new_phone_number" placeholder="Phone Number" />
      <input id="new_address" placeholder="Address" />
      <input id="new_notes" placeholder="Notes" />
      <button onClick={addEntry}>Add Entry</button>
    </>
  );
}