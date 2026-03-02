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

import { GraphicDesign } from "@/app/pages/database/types/graph";
import { Medical } from "@/app/pages/database/types/medical";

const business_types: Record<"A" | "B", React.ReactNode> = {
  A: <GraphicDesign />,
  B: <Medical />,
};

export default function DatabasePage() {

  const[activeType, setActiveType] = useState<"A" | "B">('A');

  return (

    <>

    <div>
      <label htmlFor="bis_type">Buisness Type </label>
      <select 
        id="bis_type" 
        className="bis_type" 
        value={activeType} 
        onChange={(e) => setActiveType(e.target.value as "A" | "B")}>
        <option value="A">Graphic Design</option>
        <option value="B">Medical</option>
      </select>
    </div>

    <div key={activeType}>
      {business_types[activeType]}
    </div>

    </>

  );
}
