"use client";
import React from "react";
import Confetti from "react-confetti";

export default function Celebrate() {
  if (typeof window === "undefined") {
    return "";
  }
  return (
    <>
      <Confetti
        height={window.innerHeight}
        width={window.innerWidth}
      ></Confetti>
      <div className="relative px-6 flex items-center justify-center h-screen">
        <div>
          <div className="text-4xl">Congratulations Mayor Azim</div>
          <div>Thank you for your support.</div>
        </div>
      </div>
    </>
  );
}
