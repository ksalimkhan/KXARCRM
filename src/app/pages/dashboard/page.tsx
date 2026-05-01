'use client';

import "./pageStyle.css";
import ProjectInfo from "@/app/pages/dashboard/projectInfo";
import DatabaseInfo from "@/app/pages/dashboard/databaseInfo";
import ClientInfo from "@/app/pages/dashboard/clientInfo";
import TaskInfo from "@/app/pages/dashboard/taskInfo";

export default function DashboardPage() {

  return (

    <>
    <div className='infographics'>
        <ProjectInfo className="gridItem"/>
        <DatabaseInfo className="gridItem"/>
        <ClientInfo className="gridItem"/>
        <TaskInfo className="gridItem"/>
    </div>
    </>

  );
}
