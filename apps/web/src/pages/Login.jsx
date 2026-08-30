import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  return (
    <main>
      <div className="flex min-h-screen">
        <div className="relative z-2 flex shrink-0 grow-0 basis-1/2 flex-col justify-center bg-[#0d1f2d] p-12 text-white [clip-path:polygon(0_0,100%_0,85%_100%,0_100%)]">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat ">
            <div className="absolute inset-0 bg-[rgba(30,18,10,0.75)] d-flex flex-column justify-content-center">
              <div className="position-absolute top-0 inset-s-0 p-4 px-5 py-4">
                <span></span>
              </div>
              <div className="d-flex align-items-center justify-content-center"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center bg-[#f8f9fb] px-8 py-12">
        <div className="w-full max-w-420px">
          <div className="mb-6 flex border-b-[1.5px] border-[#dee2e6]">
            <button></button>
            <button></button>
          </div>
          <div className={`form-box ${activeForm === "login" ? "active" : ""}`}>
            <form onSubmit={handleLogin}>
              <h2 className="text-center fw-bold mb-4 text-caramel">
                Welcome Back!
              </h2>
              <p className="text-center">Please login to your account</p>
              {error && <p className="error-message">{error}</p>}

              <input
                type="email"
                placeholder="Email"
                className="input1"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <div className="password-input-wrap">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  className="input1 password-input"
                  required
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowLoginPassword((prev) => !prev)}
                  aria-label={
                    showLoginPassword ? "Hide password" : "Show password"
                  }
                  title={showLoginPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon open={showLoginPassword} />
                </button>
              </div>

              <button type="submit" className="button1" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="p">
                Don't have an account?{" "}
                <a
                  href="#"
                  onClick={() => {
                    setActiveForm("register");
                    setError("");
                  }}
                >
                  Register
                </a>
              </p>
            </form>
          </div>
           <div
              className={`form-box ${activeForm === "register" ? "active" : ""}`}
            >
              <form onSubmit={handleRegister}>
                <h2 className="text-center fw-bold mb-4 text-caramel">Register</h2>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input1"
                  required
                  value={registerData.first_name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      first_name: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="input1"
                  required
                  value={registerData.last_name}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      last_name: e.target.value,
                    })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="input1"
                  required
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />

                <div className="password-input-wrap">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password"
                    className="input1 password-input"
                    required
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        password: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowRegisterPassword((prev) => !prev)}
                    aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                    title={showRegisterPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showRegisterPassword} />
                  </button>
                </div>
                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="button1" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>

                <p className="p">
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={() => {
                      setActiveForm("login");
                      setError("");
                    }}
                  >
                    Login
                  </a>
                </p>
              </form>
            </div>
        </div>
      </div>
    </main>
  );
}
