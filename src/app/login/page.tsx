'use client';

import {supabase} from "@/app/server/supabaseClient"
import React from 'react'
import Login from "@/components/Login"
import {useState} from "react"

export default function Home() {
  const [loginStatus, setLoginStatus] = useState('Pending');

  async function signIn(email: string, password: string) {
    // Calls supabase auth function to sign in
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    // Log user information
    console.log('Email:', email);
    console.log('Password:', password);
    // If user is returned then sign in was successful, update status and redirect user
    if(data.user) {
      setLoginStatus("Valid Email and Password, signing in")
      window.location.href = 'http://localhost:3000/pages/dashboard'
    }
    // If no user returned, sign in failed, update status
    else
      setLoginStatus("Invalid Email or Password")
  }

  return (
    <div>
      <p>Status: {loginStatus}</p>
      <Login onLoginSubmit={signIn} />
    </div>
  );
}
