export default function Signup() {
  return (
    <main className="flex min-h-screen bg-white">
      <div className="relative z-2 flex shrink-0 grow-0 basis-1/2 flex-col justify-center p-12 text-white [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
        <div className="absolute inset-0 bg-[url('/images/featured-bella.jpg')] bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-[rgba(30,18,10,0.75)]">
            <div className="relative h-full flex flex-col justify-end p-1">
              <div className="absolute top-0 left-0">
                <a href="/">
                  <img
                    src="/images/PawBorrowLogo.png"
                    alt="PawBorrow Logo"
                    className="h-[165px] w-[165px]"
                  />
                </a>
              </div>

              <div className="relative h-full flex flex-col justify-end p-12">
                <span className="font-serif text-[32px] font-normal text-white">
                  PawBorrow
                </span>

                <p className="mt-2 text-base text-white">
                  You've got a Paw in me.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-8 py-12">
        <div className="w-full max-w-[420px]">
          <div className="flex flex-col items-center justify-center text-center">
            <a href="/">
              <img
                src="/images/PawLogo2.png"
                alt="PawBorrow Logo"
                className=""
              />
            </a>

            <h1 className="font-serif text-[32px] font-normal text-[#1b1b1b]">
              Create Your Account
            </h1>

            <p className="mt-2 text-sm text-[#6f6f6f]">
              Join now to have an Pawesome experience!
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="mb-2 block font-body text-xs uppercase text-black">
                  First Name
                </label>

                <input
                  type="text"
                  required
                  className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
                />
              </div>

              <div className="flex-1">
                <label className="mb-2 block font-body text-xs uppercase text-black">
                  Last Name
                </label>

                <input
                  type="text"
                  required
                  className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block font-body text-xs uppercase text-black">
                Email
              </label>

              <input
                type="email"
                required
                className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block font-body text-xs uppercase text-black">
                Phone Number{" "}
                <span className="normal-case text-[#6f6f6f]">(optional)</span>
              </label>

              <input
                type="tel"
                maxLength={11}
                className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block font-body text-xs uppercase text-black">
                Password
              </label>

              <input
                type="password"
                required
                className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block font-body text-xs uppercase text-black">
                Confirm Password
              </label>

              <input
                type="password"
                required
                className="h-[46px] w-full rounded-xl border border-black bg-white px-4 py-3 font-body text-sm"
              />
            </div>

            {/* Create Account */}
            <button
              type="submit"
              className="h-[52px] w-full rounded-full bg-[#879b7b] text-sm font-normal uppercase text-white transition-colors hover:bg-[#748a68]"
            >
              Create Account
            </button>
          </form>

          <p className="mt-5 px-2 text-center font-body text-[11px] leading-relaxed text-[#888]">
            By creating an account, you agree to our{" "}
            <a
              href="/tos"
              className="text-[#6f6f6f] underline underline-offset-2 transition-colors hover:text-[#879b7b]"
            >
              Terms of Service
            </a>{" "}
            and acknowledge that PawBorrow and each Member process your personal
            data in accordance with our{" "}
            <a
              href="/privacy"
              className="text-[#6f6f6f] underline underline-offset-2 transition-colors hover:text-[#879b7b]"
            >
              Privacy Policy
            </a>
            .
          </p>

          <p className="mt-8 text-center text-sm text-[#6f6f6f]">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#6f6f6f] transition-colors hover:text-[#879b7b]"
            >
              Log in
            </a>
          </p>

          {/* Administrator */}
          {/*
          <p className="mt-4 text-center text-xs text-[#999]">
            Administrator?{" "}
            <a
              href="/admin/login"
              className="text-[#6f6f6f] hover:text-[#879b7b]"
            >
              Click here
            </a>
          </p>
          */}
        </div>
      </div>
    </main>
  );
}
