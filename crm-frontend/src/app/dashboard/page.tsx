import React from "react";
import Link from "next/link";

const dashboard: React.FC = () => {
	return (
		<div>
			{/* Dashboard content goes here */}
            <h1>WELCOME TO THE DASHBOARD</h1>

			<Link
			className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
			href="/"
			rel="noopener noreferrer"
			>
				Back
			</Link>
		</div>
	);
};

export default dashboard;