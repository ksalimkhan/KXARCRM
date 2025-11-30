'use client';

import {supabase} from "@/app/server/supabaseClient"
import React from 'react'
import SignUp from "@/components/SignUp"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SignUpPage() {
  const [loginStatus, setLoginStatus] = useState('Pending');
  const router = useRouter();


  async function signUp(email: string, password: string, confirmPassword: string){
      const {data, error} = await supabase.auth.signUp({
          email: email,
          password: password,
      })
  }
  //Validates Login Data
  const handleSignUp = (email: string, password: string, confirmPassword: string) => {
    setLoginStatus('Checking Credentials...');
    if(password === confirmPassword && password.length > 4){
      setLoginStatus('Passwords match. Account Created');
      router.push('/dashboard');
    } else {
      setLoginStatus("Passwords don't match");
    }

  };

  return (
    <div>
      {/* 💡 Pass the function down via the 'onLoginSubmit' prop */}
      <p>Status: {loginStatus}</p>
      {/* Pass Props to Login*/}
      <SignUp onSignUpSubmit={signUp} />
      
    </div>
  );
}
