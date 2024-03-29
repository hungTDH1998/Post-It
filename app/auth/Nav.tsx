import React from "react";
import Link from "next/link";
import Login from "./Login";
import Logged from "./Logged";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";



export default async function Nav() {
  
  const session: any = await getServerSession( authOptions );
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1 className="font-Lobster text-lg text-orange-600">Home Page </h1>
      </Link>
      <ul className="flex items-center py-8">
        {!session?.user && <Login />}
        {session?.user && <Logged image={session.user?.image || ""} />}
      </ul>
    </nav>
  );
}
