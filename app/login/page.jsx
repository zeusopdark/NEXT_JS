"use client";
import { Context } from "@/components/Clients";
import { redirect } from "next/navigation";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const loginHandler = async (e) => {
    console.log(email.password);
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        toast.success(data.message);
      } else {
        return toast.error(data.message);
      }
      console.log(data);
    } catch (err) {
      console.log("There is an error", err);
    }
  };
  if (user._id) return redirect("/");
  return (
    <div className="login">
      <section>
        <form onClick={loginHandler}>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            value={email}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button type="submit">Login</button>
          <p>OR</p>
          <Link href={"/register"}>New User</Link>
        </form>
      </section>
    </div>
  );
};

export default Page;
