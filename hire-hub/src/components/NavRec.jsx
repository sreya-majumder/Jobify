"use client";

import Link from "next/link";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import React, { useEffect } from "react";


export default function NavRec() {
  const user = useSession();
  const { data: session, status } = useSession();
  
  const [stored, setstored] = React.useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const userInformation = user.data?.user;
      const userId = userInformation?._id;

      const response = await fetch(`http://localhost:3000/api/my-profile`, {
        method: "POST",
        body: JSON.stringify({ id: userId }),
      });
      const data = await response.json();

        setstored(userId);

    };
    fetchData();
  }, [user]);
  // console.log(stored);

  return (
    <>



      <div className="bg-gray-900">
        <div className="container mx-auto px-10">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
              <button className="search-button">
                <div className="hoverEffect">
                <Link href="/search-user">Search</Link>
                  <div></div>
                </div>
              </button>
              <span className="w-5font-semibold text-xl tracking-tight">
                &nbsp;&nbsp;&nbsp;<Link href="/">Jobify</Link>
              </span>
            </div>

            <div className="hidden  md:flex md:items-center md:ml-auto md:mr--10 ">
              <p className="text-gray-300 hover:text-white px-4">
                <Link href="/recruiter-home">Home</Link>
              </p>
              <p className="text-gray-300 hover:text-white px-4"><Link href={`/complaint/${stored}/add-complaint`}>Report</Link></p>
              <p className="text-gray-300 hover:text-white px-4"><Link href={`/blog/${stored}/view-blogs`}>Blogs</Link></p>

              <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/${stored}/applicants`}>Applicants</Link></p>

              {session ? (
                <>
                <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/profile/${stored}`}>Profile</Link></p>
                <p className="text-gray-300 hover:text-white px-4"><Link href={`/recruiter/public-profile/${stored}`}>Public Profile</Link></p>
                <button
                  className="button1"
                  onClick={() => {
                    signOut();
                  }}
                >
                <Link href="/login">Sign Out</Link> 
                  
                </button>
                
                </>
                
              ) : (
                <>
                  <button className="button1">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Link href="/login">Sign In</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </button>
                  <button className="button2">
                    <Link href="/register">Sign Up</Link>
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
</>
      )}