'use client';

import React from 'react'
import SignUp from "@/components/SignUp"
import {useState} from "react"
import {useRouter} from "next/navigation"

export default function SignUpPage() {
  const [loginStatus, setLoginStatus] = useState('Pending');
  const router = useRouter();

  //Validates Login Data
  const handleSignUp = (email: string, password: string, confirmPassword: string) => {
    setLoginStatus('Checking Credentials...');
    if(password === confirmPassword && password.length > 4){
      setLoginStatus('Passwords match. Account Created');
      router.push('/pages/dashboard');
    } else {
      setLoginStatus("Passwords don't match");
    }

  };

  return (
    <div>
      {/* 💡 Pass the function down via the 'onLoginSubmit' prop */}
      <p>Status: {loginStatus}</p>
      {/* Pass Props to Login*/}
      <SignUp onSignUpSubmit={handleSignUp} />
      
    </div>
  );
}
