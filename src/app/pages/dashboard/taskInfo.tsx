'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from 'chart.js';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/server/supabaseClient';

ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

type Task = {
  id: number;
};

export default function ClientInfo() {

  const[lowPriorityTasks, SetLowPriorityTasks] = useState<Task[]>([]);
  const[mediumPriorityTasks, SetMediumPriorityTasks] = useState<Task[]>([]);
  const[highPriorityTasks, SetHighPriorityTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchLowPriorityTasks();
    fetchMediumPriorityTasks();
    fetchHighPriorityTasks();
  }, []);

  const fetchLowPriorityTasks = async () =>
  {
    const { data, error } = await supabase
    .from('tasks')
    .select("*")
    .eq('priority', 'low');

    if (error) {console.error('Error fetching data:', error);}
    else { SetLowPriorityTasks(data || []);}
  };

  const fetchMediumPriorityTasks = async () =>
  {
    const { data, error } = await supabase
    .from('tasks')
    .select("*")
    .eq('priority', 'medium');

    if (error) {console.error('Error fetching data:', error);}
    else { SetMediumPriorityTasks(data || []);}
  };

  const fetchHighPriorityTasks = async () =>
  {
    const { data, error } = await supabase
    .from('tasks')
    .select("*")
    .eq('priority', 'high');

    if (error) {console.error('Error fetching data:', error);}
    else { SetHighPriorityTasks(data || []);}
  };


  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [
      {
        label: 'Number',
        data: [lowPriorityTasks.length, mediumPriorityTasks.length, highPriorityTasks.length],
        backgroundColor: [
          '#7fff00',
          '#8a2be2',
          '#ff8c00',
        ],
        borderColor: [
          '#62c103',
          '#650eb7',
          '#c6740f',
        ],
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Task Priority Information',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

