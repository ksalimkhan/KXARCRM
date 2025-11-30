'use client';

import React from 'react'
import Login from "@/components/Login"
import {useState} from "react"
import {useRouter} from "next/navigation"

const dummyUser = 'admin@KXAR.com';
const dummyPass = 'password';
export default function Home() {
  const [loginStatus, setLoginStatus] = useState('Pending');
  const router = useRouter();

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
      <Login onLoginSubmit={handleLoginSubmit} />
    </div>
  );
}
