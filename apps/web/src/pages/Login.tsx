import { useState } from "react";

export default function Login() {
  return (
    <main className="flex min-h-screen bg-white">
        <div className="relative z-2 flex shrink-0 grow-0 basis-1/2 flex-col justify-center p-12 text-white [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          <div className="absolute inset-0 bg-[url('/images/featured-bella.jpg')] bg-cover bg-center bg-no-repeat ">
            <div className="absolute inset-0 bg-[rgba(30,18,10,0.75)] d-flex flex-column justify-content-center">
              <div className="relative h-full flex flex-col justify-end p-1">
                <div className="absolute top-0 left-0">
                  <a href="/">
                    <img
                      src="/images/PawBorrowLogo.png"
                      alt="Logo"
                      className="w-[165px] h-[165px]"
                    />
                  </a>
                </div>
                <div className="relative h-full flex flex-col justify-end p-12">
                  <span className="font-serif text-[32px] font-normal text-white">
                    PawBorrow
                  </span>
                  <p className="mt-2 text-base text-white">
                    You've got a friend in me.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
   

      <div className="flex flex-1 items-center justify-center px-8 py-12 ">
        <div className="w-full max-w-[420px]">
          <div className="flex flex-col items-center justify-center text-center">
              <a href="/"> <img src="/images/PawLogo2.png" alt="Logo" className=""/></a>
            <h1 className="font-serif text-[32px] font-normal text-[#1b1b1b]">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-[#6f6f6f]">
              Sign in to continue to your account
            </p>
          </div>

          <form className="space-y-5">
            <div className="mb-4">
              <label className="font-body text-xs uppercase text-black block mb-2">Email</label>
              <input type="email" required /*value={email}*/ className="h-[46px] w-full rounded-xl border border-black bg-whtie px-4 py-3 font-body text-sm" />
            </div>
            <div className="mt-4">
              <label className="font-body text-xs uppercase text-black block mb-2">Password</label>
              <input type="password" required /*value={password}*/ className="h-[46px] w-full rounded-xl border border-black bg-whtie px-4 py-3 font-body text-sm" />
            </div>

            <div className="pt-4 text-right">
              <a href="/forgot-password" className="text-xs text-[#6f6f6f] transition-colors hover:text-[#879b7b]">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="h-[52px] w-fullrounded-fullbg-[#879b7b] text-sm font-normal uppercase text-white transition-colorshover:bg-[#748a68]">
              Log In
            </button>
          </form>

          <div className="relative my-8 flex items-center">
            <div className="h-px flex-1 bg-[#dedede]" />
            <span className="bg-[#fafaf8] px-3 text-xs uppercase tracking-wide text-[#999]">
              Or continue with
            </span>
            <div className="h-px flex-1 bg-[#dedede]" />
          </div>

          <p className="mt-8 text-center text-sm text-[#6f6f6f]">
            Don't have an account?{" "}
            <a href="/register" className="text-[#6f6f6f] hover:text-[#879b7b]">
              Sign up
            </a>
          </p>

          {/*
          <p className="mt-4 text-center text-xs text-[#999]">
            Administrator?{" "}
            <a
              href="/admin/login"
              className="text-[#6f6f6f] hover:text-[#879b7b]"
            >
              Click here
            </a>
          </p> */}
        </div>
      </div>
    </main>
  );
}
