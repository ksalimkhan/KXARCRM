'use client';

import "@/app/pages/dashboard/pageStyle.css";
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import { ShowCustomers } from "@/app/pages/dashboard/tables/customers";
import { ShowProjects } from "@/app/pages/dashboard/tables/projects";
import { ShowPayments } from "@/app/pages/dashboard/tables/payments";

const tables = {
  A: <ShowCustomers />,
  B: <ShowProjects />,
  C: <ShowPayments />,
};

export function GraphicDesign() {

  const[activeTable, setActiveTable] = useState('A');

  return (
    <Card className="m-8 p-8">
      <div>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <div className="gap-4 flex">
            <Button onClick={() => setActiveTable('A')}>Customers</Button>
            <Button onClick={() => setActiveTable('B')}>Projects</Button>
            <Button onClick={() => setActiveTable('C')}>Payments</Button>
          </div>
        </CardHeader>

        <CardContent>
          {tables[activeTable]}
        </CardContent>
      </div>
    </Card>
  );
}
