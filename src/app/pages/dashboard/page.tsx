'use client';

import "./pageStyle.css";
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

import { GraphicDesign } from "@/app/pages/dashboard/types/graph";
import { Medical } from "@/app/pages/dashboard/types/medical";

const business_types = {
  A: <GraphicDesign />,
  B: <Medical />,
};

export default function DashboardPage() {

  const[activeType, setActiveType] = useState('A');

  return (

    <>

    <div>
      <label htmlFor="bis_type">Business Type</label>
      <select id="bis_type" className="bis_type">
        <option value="Graphic Design" onClick = {() => setActiveType('A')}>Graphic Design</option>
        <option value="Medical" onClick = {() => setActiveType('B')}>Medical</option>
      </select>
    </div>

    {business_types[activeType]}

    </>

  );
}
