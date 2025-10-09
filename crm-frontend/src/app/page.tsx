import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/KXARLOGO.svg"
          alt="KXAR logo"
          width={200}
          height={50}
          priority
        />
        
        <ul className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            <input type="text" id="username" name="username" placeholder="username"></input>
          </li>
          <li className="tracking-[-.01em]">
            <input type="text" id="username" name="username" placeholder="password"></input>
          </li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/dashboard"
            rel="noopener noreferrer"
          >
          Login
          </Link>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/ksalimkhan/KXARCRM"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Make these into other links where it talks about us and our platform */}
          <Image
            aria-hidden
            src="/github-mark.svg"
            alt="GitHub Icon"
            width={16}
            height={16}
          />
          GitHub Repo
        </a>
        
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="round-i.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          About Us
        </a>
      </footer>
    </div>
  );
  
}
