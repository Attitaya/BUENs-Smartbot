import React, { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/sidebar";
import { Navbar } from "@/components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BUEN Chat Bot",
  description: "BUENs",
};

export default function RootLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div className="navbar-container">
            <Navbar />
          </div>
        {children}
        </div>
      </body>
    </html>
  );
}
