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

type Project = {
  project_id: number;
};

type Customer = {
  customer_id: number;
};

type Profile = {
  id: string;
};

export default function ClientInfo() {

  const[customers, setCustomers] = useState<Customer[]>([]);
  const[incompleteProjects, setIncompleteProjects] = useState<Project[]>([]);
  const[teamMembers, setTeamMembers] = useState<Profile[]>([]);

  useEffect(() => {
      fetchCustomers();
      fetchIncompleteProjects();
      fetchTeamMembers();
  }, []);


  const fetchCustomers = async () =>
  {
    const { data, error } = await supabase
    .from('customers')
    .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setCustomers(data || []);}
  };

  const fetchIncompleteProjects = async () =>
  {
    const { data, error } = await supabase
    .from('projects')
    .select("*")
    .eq('status', 'In Progress');

    if (error) {console.error('Error fetching data:', error);}
    else { setIncompleteProjects(data || []);}
  };

  const fetchTeamMembers = async () =>
  {
    const { data, error } = await supabase
    .from('profiles')
    .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setTeamMembers(data || []);}
  };

  const data = {
    labels: ['Clients', 'Incomplete Projects', 'Team Members'],
    datasets: [
      {
        label: 'Number',
        data: [customers.length, incompleteProjects.length, teamMembers.length],
        backgroundColor: [
          '#00FFFF',
          '#B36AC0',
          '#1CFF18',
        ],
        borderColor: [
          '#019e9e',
          '#834A8D',
          '#029100',
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
        text: 'Project Management Statistics',
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

