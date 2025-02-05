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

export default function ChaiPiloApp() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      fetchEntries(token);
    } else {
      setIsAuthenticated(false);
      router.push("/login");
    }
  }, [router]);

  const fetchEntries = async (token: string) => {
    try {
      const response = await axios.get<Entry[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/entries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEntries(response.data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      {loading ? (
        <p>Loading...</p> // Show loading state while fetching
      ) : !isAuthenticated ? (
        <p>Please log in to access the app.</p>
      ) : (
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
          <div>
            <Link
              href="/todays-entry"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Today&apos;s Entry
            </Link>
          </div>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Doodh Laya</th>
                <th className="border p-2">Bartan Dhoya</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{entry.date}</td>
                  <td className="border p-2">{entry.doodh_laya || "-"}</td>
                  <td className="border p-2">{entry.bartan_dhoya || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
