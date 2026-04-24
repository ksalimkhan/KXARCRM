"use client";

import "./pageStyle.css";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TableManager } from "@/app/pages/database/tableManager";

export default function DatabasePage() {
  return (
    <>
      <div>
        <TableManager />
      </div>
    </>
  );
}
