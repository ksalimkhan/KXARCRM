'use client';

import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import {Card } from '@/components/ui/card';
import 'react-calendar/dist/Calendar.css';

export default function ShowCalendar() {
    const [value, setValue] = useState(new Date());

    const handleDateChange = (date) => {
        setValue(date); // Update the selected date
    };

    return (
        <Card className="p-4 max-w-md mx-auto mt-10">
            <h1>Select a Date</h1>
            <Calendar onChange={handleDateChange} value={value} />
            <p>Selected Date: {value.toDateString()}</p>
        </Card>
    );
}
