"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src="/tea-cup.png" alt="Remote Image" width={50} height={50} />
          {/* <h1 className="text-2xl font-bold p-1"> Chai Pilo App</h1> */}
          <Link href="/" className="text-2xl font-bold p-1">
            Chai Pilo App
          </Link>
        </div>
        <Link href="/rules" className=" text font-bold">
          नियम और शर्तें
        </Link>
      </div>
      <hr />
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Jo doodh layega, vo bartan bhi dhoyega.</li>
          <li>
            Agar doodh laya aur bartan nahi dhoya, toh jisne dhoya uske badle
            use dhona hoga.
          </li>
          <li>jo backchodi kiya use group se bahiskrit kia jayega!</li>
        </ul>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h1 className="font-bold p-1">Respected Committee Member</h1>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Mitthi</li>
          <li>mohit</li>
          <li>paaji</li>
          <li>kusal</li>
          <li>jp</li>
          <li>baghmaaru</li>
        </ol>
      </div>
    </div>
  );
}
