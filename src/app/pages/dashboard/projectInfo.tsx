'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';


import { useEffect, useState } from 'react';
import { supabase } from '@/app/server/supabaseClient';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function ProjectInfo() {

  const[completedProjects, setCompletedProjects] = useState(0);
  const[totalProjects, setTotalProjects] = useState(0);

  useEffect(() => {
      fetchCompletedProjects();
      fetchTotalProjects();

  }, []);

  const fetchCompletedProjects = async () =>
  {
    const { data, error } = await supabase
      .from('projects')
      .select("*")
      .eq('status', 'Completed');

    if (error) {console.error('Error fetching data:', error);}
    else { setCompletedProjects(data?.length || 0);}
  };

  const fetchTotalProjects = async () =>
  {
    const { data, error } = await supabase
      .from('projects')
      .select("*")

    if (error) {console.error('Error fetching data:', error);}
    else { setTotalProjects(data?.length || 0);}
  };

  const data = {
    labels: ['Completed Projects', 'Incomplete Projects'],
    datasets: [
      {
        label: 'Number of Projects',
        data: [completedProjects, totalProjects - completedProjects],
        backgroundColor: [
          '#15ed20',
          '#1fc3e0',
        ],
        borderColor: [
          '#0da314',
          '#0d8499',
        ],
        borderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Total Projects - ' + totalProjects,
      },
    },
  };

  return (
    <div style={{width: '800px', height: '400px'}}>
      <Pie data={data} options={options} />
    </div>
  );

}
