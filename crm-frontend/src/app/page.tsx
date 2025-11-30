'use client';

import {supabase} from "@/app/server/supabaseClient"
import React from 'react'
import Login from "@/components/Login"
import {useState} from "react"

export default function Home() {
  const [loginStatus, setLoginStatus] = useState('Pending');

  async function handleSignIn(){
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)

    // If fails to sign in
    if (event === 'INITIAL_SESSION'){
      //placeholder, will improve display method in future
      setLoginStatus('Invalid Email or Wrong Password')
    }
    // If properly signs in
    else if (event === 'SIGNED_IN'){
      window.location.href = 'http://localhost:3000/pages/dashboard'
    }
  })
  }

  async function signIn(email: string, password: string){
    // Calls supabase auth function to sign in
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    console.log('Email:', email);
    console.log('Password:', password);
    // Call helper function to handle sign in event
    handleSignIn()
  }

  return (
    <div>
      <p>Status: {loginStatus}</p>
      <Login onLoginSubmit={signIn} />
    </div>
  );
}
