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

import Login from "@/components/Login";

type Props = {
    onLoginSubmit: (email: string, password: string) => void;
    triggerText?: string;
};

export default function LoginModal({ onLoginSubmit, triggerText = "Login"}: Props) {
    const [open, setOpen] = React.useState(false);

    async function handleLogin(email: string, password: string) {
        await onLoginSubmit(email, password);
        setOpen(false);
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
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>

        {/* Your component, but rendered in modal mode */}
        <Login onLoginSubmit={handleLogin} variant="modal" />
      </DialogContent>
    </Dialog>
  );
}