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

// Register the required Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, Title, CategoryScale, LinearScale);

export default function BarChart() {

  const[projects, setProjects] = useState([]);
  const[customers, setCustomers] = useState([]);
  const[payments, setPayments] = useState([]);
  const[tasks, setTasks] = useState([]);

  useEffect(() => {
      fetchProjects();
      fetchCustomers();
      fetchPayments();
      fetchTasks();
  }, []);

  const fetchProjects = async () =>
  {
    const { data, error } = await supabase
      .from('projects')
      .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setProjects(data);}
  };

  const fetchCustomers = async () =>
  {
    const { data, error } = await supabase
      .from('customers')
      .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setCustomers(data);}
  };

  const fetchPayments = async () =>
  {
    const { data, error } = await supabase
      .from('payments')
      .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setPayments(data);}
  };

  const fetchTasks = async () =>
  {
    const { data, error } = await supabase
      .from('tasks')
      .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setTasks(data);}
  };

  const data = {
    labels: ['Projects', 'Customers', 'Payments', 'Tasks'],
    datasets: [
      {
        label: 'Number',
        data: [projects.length, customers.length, payments.length, tasks.length],
        backgroundColor: [
          '#20afdb',
          '#19e046',
          '#e31ce4',
          '#8a38ed',
        ],
        borderColor: [
          '#0f7391',
          '#0d8127',
          '#910f91',
          '#5e1bae',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Database Statistics',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: '800px', height: '800px' }}>
        <Bar data={data} options={options} />
    </div>
  );
}

