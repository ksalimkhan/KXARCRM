'use client'
import {supabase} from "@/app/server/supabaseClient"
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import "./pageStyle.css";

export default function SignOut() {
  const signOut = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { error } = await supabase.auth.signOut();

    if(error) {
      console.error('Error Signing Out');
    }

    window.location.href = 'http://localhost:3000/'
  };

  return (
    <>
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
