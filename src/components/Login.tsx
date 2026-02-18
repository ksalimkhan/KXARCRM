import React from 'react'
import Link from "next/link";
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

interface LoginProps {
  onLoginSubmit: (username: string, password: string) => void;
}

export default function Login({ onLoginSubmit }: LoginProps) {
  //Add state to track input values
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the callback function, passing the state values up to the parent
    onLoginSubmit(email, password);

    // Clear form fields after submission
    // setEmail('');
    // setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="dark flex w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link">
              <a href="/signup">
              Sign Up
              </a>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* Email Input */}
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2 pt-4">
                {/* Submit button for form submission */}
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <Button type="button" variant="outline" className="w-full">
                  <Link href="/pages/dashboard" className="w-full"> Login with Google </Link>
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
