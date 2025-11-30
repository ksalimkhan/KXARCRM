'use client';

import {supabase} from "@/app/server/supabaseClient"
import React from 'react'
import SignUp from "@/components/SignUp"
import {useState} from "react"

export default function SignUpPage() {
  const [loginStatus, setLoginStatus] = useState('Pending');


  async function signUp(email: string, password: string, confirmPassword: string){
    // Calls supabase auth function to signup
      const {data, error} = await supabase.auth.signUp({
          email: email,
          password: password,
      })
  }

  return (
    <div>
      {/* 💡 Pass the function down via the 'onLoginSubmit' prop */}
      <p>Status: {loginStatus}</p>
      {/* Pass Props to Login*/}
      <SignUp onSignUpSubmit={signUp} />
      
    </div>
  );
}
