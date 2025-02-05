import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src="/tea-cup.png" alt="Remote Image" width={50} height={50} />
          <Link href="/" className="text-2xl font-bold p-1">
            Chai Pilo App
          </Link>
        </div>
        <Link href="/rules" className=" text font-bold">
          नियम और शर्तें
        </Link>
      </div>
      <hr />
      {children}
      <Image src="/chai-pilo.jpg" alt="Remote Image" width={500} height={500} />
    </div>
  );
}
