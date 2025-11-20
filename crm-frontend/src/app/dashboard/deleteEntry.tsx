'use client'
import {supabase} from "@/lib/supabaseClient"
import type { MouseEvent } from "react";

export default function DeleteEntry() {
  const deleteEntry = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    const userID = (document.getElementById("customer_id") as HTMLInputElement).value;
    const {data, error} = await supabase.from("customers").delete().eq('id', userID);
    
    if(error) {
        console.error("Error removing user: ",
            error.message,
            error.details,
            error.hint);
    } else {
        console.log("User removed:", data);
    }
    location.reload();
  };

  return (
    <>
        <p style={{fontSize: 30}}>Remove Customer</p>
        <input id="customer_id" placeholder="ID" />
        <button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
        onClick={deleteEntry}>Remove Entry</button>
    </>
  );
}