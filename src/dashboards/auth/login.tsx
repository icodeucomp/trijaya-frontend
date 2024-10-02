"use client";

import * as React from "react";

import { Background, Button } from "@/components";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useLogin } from "@/hooks";

interface LoginTypes {
  username: "";
  password: "";
}

export const Login = () => {
  const [input, setInput] = React.useState<LoginTypes>({ username: "", password: "" });
  const [isVisible, setVisible] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const { execute, error, loading } = useLogin("/auth/login");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.password || !input.password) {
      return;
    }
    execute(input);
  };

  return (
    <Background src="/images/pattern.png" className="min-h-screen items-center justify-center p-4 text-dark">
      <div className="w-full h-max max-w-sm p-4 mx-auto border border-gray shadow-lg rounded-3xl text-dark bg-light z-1 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <h5 className="text-2xl font-bold text-center text-dark-1 mb-6 sm:mb-8">Sign In</h5>

          <div className="relative w-full mt-4">
            <input type="text" id="username" className="floating-input peer" placeholder=" " onChange={handleChange} autoComplete="off" />
            <label
              htmlFor="username"
              className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Input your username
            </label>
          </div>
          {error && !input.username && <small className="text-secondary">Enter your username</small>}

          <div className="relative w-full mt-4">
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              className="floating-input pr-8 peer"
              placeholder=" "
              onChange={handleChange}
              autoComplete="off"
            />
            <label
              htmlFor="password"
              className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Input your password
            </label>
            <button type="button" className="absolute right-0 p-1 bottom-1 bg-light" onClick={() => setVisible(!isVisible)}>
              {isVisible ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            </button>
          </div>
          {error && !input.password && <small className="text-secondary">Enter your password</small>}
          {loading ? (
            <div className="flex justify-center pt-6">
              <div className="loader"></div>
            </div>
          ) : (
            <Button type="submit" className="text-light bg-primary hover:bg-primary/90 mt-6">
              Sign In
            </Button>
          )}
        </form>
      </div>
    </Background>
  );
};