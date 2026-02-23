"use client";

import React, { useState } from "react";
import { supabase } from "@/app/server/supabaseClient";
import SignUpModal from "@/components/SignUpModal";

export default function SignUpPage() {
  const [loginStatus, setLoginStatus] = useState("Pending");

  async function signUp(email: string, password: string, confirmPassword: string) {
    if (password !== confirmPassword) {
      setLoginStatus("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) setLoginStatus(error.message);
    else setLoginStatus("Signed up!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <p>Status: {loginStatus}</p>
        <SignUpModal onSignUpSubmit={signUp} triggerText="Sign up" />
      </div>
    </div>
  );
}