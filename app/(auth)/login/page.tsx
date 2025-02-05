"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const endpoint = isLogin ? "login" : "signup";
      const payload = isLogin ? { email, password } : { name, email, password };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/${endpoint}`,
        payload
      );

      localStorage.setItem("token", response.data.token);
      router.push("/");
    } catch (error) {
      setError("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Signup"}</h2>

      {error && <div className="text-red-500">{error}</div>}

      <div className="space-y-4">
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleAuth}
          className={`${
            loading ? "bg-gray-400" : "bg-blue-500"
          } text-white px-4 py-2 rounded w-full`}
          disabled={loading}
        >
          {loading ? "Processing..." : isLogin ? "Login" : "Signup"}
        </button>

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-semibold ml-1"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
