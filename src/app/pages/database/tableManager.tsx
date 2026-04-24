"use client";

import "@/app/pages/database/pageStyle.css";
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

import { ShowCustomers } from "@/app/pages/database/tables/customers";
import { ShowProjects } from "@/app/pages/database/tables/projects";
import { ShowPayments } from "@/app/pages/database/tables/payments";

const tables = {
  A: <ShowCustomers />,
  B: <ShowProjects />,
  C: <ShowPayments />,
};

export function TableManager() {
  const [activeTable, setActiveTable] = useState<"A" | "B" | "C">("A");

  return (
    <Card className="m-8 p-8">
      <div>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <div className="gap-4 flex">
            <Button
              variant={activeTable === "A" ? "default" : "outline"}
              onClick={() => setActiveTable("A")}
            >
              Customers
            </Button>
            <Button
              variant={activeTable === "B" ? "default" : "outline"}
              onClick={() => setActiveTable("B")}
            >
              Projects
            </Button>
            <Button
              variant={activeTable === "C" ? "default" : "outline"}
              onClick={() => setActiveTable("C")}
            >
              Payments
            </Button>
          </div>
        </CardHeader>

        <CardContent>{tables[activeTable]}</CardContent>
      </div>
    </Card>
  );
}
