"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

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

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB");
    setDate(today);
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    const response = await axios.get<Entry[]>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/entries`
    );
    setEntries(response.data);
  };

  const handleSubmit = async (type: "doodhLaya" | "bartanDhoya") => {
    const payload: Partial<Entry> = { date };
    if (type === "doodhLaya") payload.doodh_laya = doodhLaya;
    if (type === "bartanDhoya") payload.bartan_dhoya = bartanDhoya;

    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/entries`, payload);
    fetchEntries();
    setShowEntryForm(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      {!showEntryForm ? (
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
            {/* <h1 className=" text font-bold">नियम और शर्तें</h1> */}
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
          <div className="space-y-2">
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
          <button
            onClick={() => setShowEntryForm(false)}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}
