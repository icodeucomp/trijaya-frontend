"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "./button";

import { ContactUsTypes } from "@/types";

export const Form = ({ buttonTitle }: { buttonTitle: string }) => {
  const initValues = { firstName: "", email: "", lastName: "", phoneNumber: "", message: "" };
  const [input, setInput] = useState<ContactUsTypes>(initValues);

  //   const validation = !input.firstName || !input.email || !input.lastName || !input.phoneNumber;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className="space-y-4" onSubmit={submitForm} autoComplete="off">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <input
            type="text"
            placeholder="First Name*"
            name="firstName"
            onChange={handleChange}
            value={input.firstName}
            className={`form-contact-input`}
          />
          {/* {error && !input.firstName && <small className="text-red-600">Masukkan nama depan anda</small>} */}
        </div>

        <div className="w-full">
          <input
            type="text"
            placeholder="Last Name*"
            name="lastName"
            onChange={handleChange}
            value={input.lastName}
            className={`form-contact-input`}
          />
          {/* {error && !input.lastName && <small className="text-red-600">Masukkan nama belakang anda</small>} */}
        </div>

        <div className="w-full col-span-2">
          <input type="email" placeholder="Email*" name="email" onChange={handleChange} value={input.email} className={`form-contact-input`} />
          {/* {error && !input.email && <small className="text-red-600">Masukkan email anda</small>} */}
        </div>

        <div className="w-full col-span-2">
          <input
            type="tel"
            placeholder="Phone Number*"
            name="phoneNumber"
            onChange={handleChange}
            value={input.phoneNumber}
            className={`form-contact-input`}
          />
          {/* {error && !input.phoneNumber && <small className="text-red-600">Masukkan no telp anda</small>} */}
        </div>

        <textarea
          rows={4}
          placeholder="Your Message"
          onChange={handleChange}
          value={input.message}
          name="message"
          className="col-span-2 form-contact-input"
        />
      </div>
      <Button type="submit" className={`btn-primary w-full`}>
        {buttonTitle}
      </Button>
    </form>
  );
};
