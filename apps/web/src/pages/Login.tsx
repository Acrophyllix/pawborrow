import { useState } from "react";

export default function Login() {
  return (
    <main>
      <div className="flex min-h-screen">
        <div className="relative z-2 flex shrink-0 grow-0 basis-1/2 flex-col justify-center bg-[#0d1f2d] p-12 text-white [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat ">
            <div className="absolute inset-0 bg-[rgba(243,215,125,0.96)] d-flex flex-column justify-content-center">
              <div className="absolute inset-0 bg-[url('/images/featured-buddy.jpg')] bg-cover bg-center bg-no-repeat"></div>
              <div className="d-flex align-items-center justify-content-center"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#f8f9fb] px-8 py-12">
        <div className="w-full max-w-105">
          <div className="mb-6 flex border-b-[1.5px] border-[#dee2e6]">
            <button></button>
            <button></button>
          </div>
        </div>
      </div>
    </main>
  );
}
