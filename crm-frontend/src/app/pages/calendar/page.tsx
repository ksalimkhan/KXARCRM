'use client';

import React, { useState } from 'react';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Important for styles

export default function ShowCalendar() {
    const [value, setValue] = useState(new Date());

    const handleDateChange = (date) => {
        setValue(date); // Update the selected date
    };

    return (
        <div>
        <h1>Select a Date</h1>
        <Calendar onChange={handleDateChange} value={value} />
        <p>Selected Date: {value.toDateString()}</p>
        </div>
    );
}
