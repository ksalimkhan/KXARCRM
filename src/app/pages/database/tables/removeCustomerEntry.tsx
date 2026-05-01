'use client';

import {supabase} from "@/app/server/supabaseClient"

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import "./tableStyle.css";

export default function RemoveCustomerEntry() {
  const removeEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const customer_id = (document.getElementById("customer_id") as HTMLInputElement).value;

    const { error } = await supabase.from('customers').delete().eq('id', customer_id);

    if(error) {console.error("Error Removing A Customer:", error.message, error.details, error.hint);}

    location.reload();
  };

  return (
    <>
      <input id="customer_id" placeholder="Customer ID" />
      <Button onClick={removeEntry}>Remove Entry</Button>
    </>
  );
}
