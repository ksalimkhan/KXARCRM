"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import SignUp from "@/components/SignUp";

type Props = {
    onSignUpSubmit: (email: string, password: string, confirmPassword: string) => void;
    triggerText?: String;
};

export default function SignUpModal({ onSignUpSubmit, triggerText = "Create account"}: Props) {
    const [open, setOpen] = React.useState(false);

    async function handleSignUp(email: string, password: string, confirmPassword: string) {
        await onSignUpSubmit(email, password, confirmPassword);
        if(password !== confirmPassword) {
            alert("Passwords Don't Match");
        }
        else {
            alert("Check Email for Verification Link");
            setOpen(false);
        }
        //Close on success 
    }

    return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md 
        rounded-2xl
        border border-white/10
        bg-gradient-to-br from-[#1e293b] via-[#1e3a5f] to-[#0f172a]
        text-white
        shadow-2xl
        backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle>Sign up</DialogTitle>
        </DialogHeader>

        {/* Your component, but rendered in modal mode */}
        <SignUp onSignUpSubmit={handleSignUp} variant="modal" />
      </DialogContent>
    </Dialog>
  );
}