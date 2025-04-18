import { useRef } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../global";

const Login = () => {
  const navigate = useNavigate();
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const togglePassword = () => {
    if (passwordInputRef.current!.type === "password") {
      passwordInputRef.current!.type = "text";
    } else {
      passwordInputRef.current!.type = "password";
    }
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-secondary-100">
      <div className="w-full h-full text-center">
        <div className="text-5xl font-bold">VINTAMEDICAL</div>

        <div className="flex justify-center items-center">
          <img
            className="w-[350px] h-[350px] rounded-full"
            src={"/Logo2.png"}
          />
        </div>

        <div className="text-2xl font-bold">Welcome</div>

        <div className="max-w-md mx-auto mt-2 p-6 rounded-lg">
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-left mb-1 text-gray-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-left mb-1 text-gray-400"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                  onClick={() => {
                    togglePassword();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="text-primary-500 hover:text-primary-700">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary-800 hover:bg-primary-900 text-white font-semibold rounded-md transition duration-200"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="mt-2">
          <div className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-1/4 border-t border-gray-300"></div>
              </div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 flex justify-center items-center">
            {/* <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-1/4 cursor-pointer flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-200"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button> */}

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                // console.log(credentialResponse);

                const { credential } = credentialResponse;
                if (credential) {
                  const data = {
                    id_token: credential,
                  };

                  axios
                    .post(`${API_URL}/auth/google-login`, data)
                    .then((res) => {
                      console.log(res);

                      localStorage.setItem("ownerId", res.data.uid);

                      navigate("/");
                    });
                }
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
