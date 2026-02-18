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

import { ShowPatients } from "@/app/pages/dashboard/tables/patients";

const tables = {
  A: <ShowPatients />,
};

export function Medical() {

  const[activeTable, setActiveTable] = useState('A');

  return (
    <Card className="m-8 p-8">
      <div>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <div className="gap-4 flex">
            <Button onClick={() => setActiveTable('A')}>Patients</Button>
          </div>
        </CardHeader>

        <CardContent>
          {tables[activeTable]}
        </CardContent>
      </div>
    </Card>
  );
}
