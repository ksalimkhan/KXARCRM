'use client';

import {supabase} from "@/app/server/supabaseClient"
import React from 'react'
import Login from "@/components/Login"
import {useState} from "react"
import {useRouter} from "next/navigation"

const dummyUser = 'admin@KXAR.com';
const dummyPass = 'password';

export default function Home() {
  const [loginStatus, setLoginStatus] = useState('Pending');
  const router = useRouter();

  async function handleSignIn(){
    const {data} = supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)

    if (event === 'INITIAL_SESSION'){
      setLoginStatus('Invalid Email or Wrong Password')
    }
    else if (event === 'SIGNED_IN'){
      window.location.href = 'http://localhost:3000/pages/dashboard'
    }
  })
  }

  async function signIn(email: string, password: string){
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })
    console.log('Email:', email);
    console.log('Password:', password);
    handleSignIn()
  }
  //Validates Login Data
  const handleLoginSubmit = (username: string, password: string) => {
    setLoginStatus('Checking Credentials...');
    if(username === dummyUser && password === dummyPass){
      {
        setLoginStatus('Logged In');
        router.push('/pages/dashboard');
      }
    } else {
      setLoginStatus('Invalid Credentials');
    }
    console.log('Login Data Received in Parent:');
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <p>Status: {loginStatus}</p>
      <Login onLoginSubmit={signIn} />
    </div>
  );
}
