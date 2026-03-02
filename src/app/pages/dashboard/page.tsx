'use client';

import "./pageStyle.css";
import PieChart from "@/app/pages/dashboard/piechart.tsx";
import BarChart from "@/app/pages/dashboard/bargraph.tsx";

export default function DashboardPage() {

  return (

    <>
    <div className='infographics'>
        <PieChart className = 'projectsChart' />
        <BarChart className = 'statisticsGraph'/>
    </div>
    </>

  );
}
