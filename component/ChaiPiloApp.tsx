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
  const [date, setDate] = useState<string>("");
  const [doodhLaya, setDoodhLaya] = useState<string>("");
  const [bartanDhoya, setBartanDhoya] = useState<string>("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [showEntryForm, setShowEntryForm] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    setDate(today);
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // User is authenticated
    } else {
      setIsAuthenticated(false); // User is not authenticated
      router.push("/login"); // Redirect to login page
    }
    fetchEntries();
  }, [router]);

  const fetchEntries = async () => {
    const response = await axios.get<Entry[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/entries`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setEntries(response.data);
  };

  const handleSubmit = async (type: "doodhLaya" | "bartanDhoya") => {
    const payload: Partial<Entry> = { date };
    if (type === "doodhLaya") payload.doodh_laya = doodhLaya;
    if (type === "bartanDhoya") payload.bartan_dhoya = bartanDhoya;

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/entries`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchEntries();
    setShowEntryForm(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      {!showEntryForm && isAuthenticated ? (
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
          <button
            onClick={() => setShowEntryForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Today's Entry
          </button>
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
      ) : (
        <>
          <p>Please log in to access the app.</p>
        </>
      )}
    </div>
  );
}
