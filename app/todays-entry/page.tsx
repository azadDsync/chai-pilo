"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Entry {
  date: string;
  doodh_laya?: string;
  bartan_dhoya?: string;
}

export default function TodaysEntry() {
  const [date, setDate] = useState<string>("");
  const [doodhLaya, setDoodhLaya] = useState<string>("");
  const [bartanDhoya, setBartanDhoya] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);  
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    setDate(today);

    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = async (type: "doodhLaya" | "bartanDhoya") => {
    const payload: Partial<Entry> = { date };
    if (type === "doodhLaya") payload.doodh_laya = doodhLaya;
    if (type === "bartanDhoya") payload.bartan_dhoya = bartanDhoya;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/entries`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
       
        setDoodhLaya("");
        setBartanDhoya("");
        
        setSuccessMessage("Bhej diya tera Entry !");
   
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      } catch (error) {
        // console.error("Error posting data", error);
        setSuccessMessage("Net thik krr apna");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      {isAuthenticated ? (
        <>
          <div className="flex justify-between">
            <div className="flex items-center">
              <Image
                src="/tea-cup.png"
                alt="Remote Image"
                width={50}
                height={50}
              />
              <Link href="/" className="text-2xl font-bold p-1">
                Chai Pilo App
              </Link>
            </div>
            <Link href="/rules" className=" text font-bold">
              नियम और शर्तें
            </Link>
          </div>
          <hr />
          <div className="p-4 bg-gray-100 rounded-lg">Date: {date}</div>

      
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-2 rounded mb-4">
              {successMessage}
            </div>
          )}

          <div className="space-y-2 ">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="doodh Laya"
                value={doodhLaya}
                onChange={(e) => setDoodhLaya(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => handleSubmit("doodhLaya")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="bartan Dhoya"
                value={bartanDhoya}
                onChange={(e) => setBartanDhoya(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={() => handleSubmit("bartanDhoya")}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Post
              </button>
            </div>
          </div>
          <div>
            <Link
              href="/"
              className="bg-red-500 text-white px-4 py-1 rounded mt-4"
            >
              Back
            </Link>
          </div>
        </>
      ) : (
        <p>Please log in to access this page.</p>
      )}
    </div>
  );
}
