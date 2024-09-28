"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { Background, Button } from "@/components";

import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { usePostApi } from "@/hooks";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isVisible, setVisible] = useState(false);

  const { execute } = usePostApi("/auth/login", "POST");

  const onSubmit = (data: any) => {
    execute(data);
  };

  return (
    <Background src="/images/pattern.png" className="min-h-screen items-center justify-center p-4 text-dark">
      <div className="w-full h-max max-w-sm p-4 mx-auto border border-gray shadow-lg rounded-3xl text-dark bg-light z-1 sm:p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-2xl font-bold text-center text-dark-1 mb-6 sm:mb-8">Sign In</h5>

          <div className="relative w-full mt-4">
            <input
              type="text"
              id="username"
              className="floating-input peer"
              placeholder=" "
              {...register("username", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Username Too Short",
                },
                maxLength: {
                  value: 50,
                  message: "Username too long",
                },
                pattern: { value: /^[a-zA-Z.!@#$%^&*-=_+ ]+$/i, message: "Please input true username." },
              })}
              autoComplete="off"
            />
            <label
              htmlFor="username"
              className="floating-label peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Input your username
            </label>
          </div>
          {errors.username && <small className="text-secondary w-full block mt-1">{`${errors.username?.message}`}</small>}

          <div className="relative w-full mt-4">
            <input
              type={isVisible ? "text" : "password"}
              id="password"
              className="floating-input pr-8 peer"
              placeholder=" "
              {...register("password", {
                required: true,
                minLength: {
                  value: 8,
                  message: "Password Too Short",
                },
                maxLength: {
                  value: 25,
                  message: "Password Too Long",
                },
              })}
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
          {errors.password && <small className="text-secondary w-full block mt-1">{`${errors.password?.message}`}</small>}

          <Button type="submit" className="text-light bg-primary hover:bg-primary/90 mt-6">
            Sign In
          </Button>
        </form>
      </div>
    </Background>
  );
};
