"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { Button } from "./button";

import { ContactUsTypes } from "@/types";
import { usePostApi } from "@/hooks";
import { useTranslations } from "next-intl";

export const Form = ({ buttonTitle }: { buttonTitle: string }) => {
  const t = useTranslations("contact-us.right-side");

  const initValues = { firstName: "", email: "", lastName: "", phoneNumber: "", message: "" };

  const [input, setInput] = useState<ContactUsTypes>(initValues);
  const [error, setError] = useState<boolean>(false);
  const { loading, execute } = usePostApi("/contact-us", "POST");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, firstName, lastName, message, phoneNumber } = input;

    if (!email || !firstName || !lastName || !message || !phoneNumber) {
      setError(true);
      return;
    }

    execute(input);

    setInput(initValues);
  };

  return (
    <form className="space-y-4" onSubmit={submitForm} autoComplete="off">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <input type="text" placeholder={`${t("first-name")}`} name="firstName" onChange={handleChange} value={input.firstName} className={`form-contact-input`} />
          {error && !input.firstName && <small className="text-secondary">Enter your first name</small>}
        </div>

        <div className="w-full">
          <input type="text" placeholder={`${t("last-name")}`} name="lastName" onChange={handleChange} value={input.lastName} className={`form-contact-input`} />
          {error && !input.lastName && <small className="text-secondary">Enter your last name</small>}
        </div>

        <div className="w-full col-span-2">
          <input type="email" placeholder={`${t("email")}`} name="email" onChange={handleChange} value={input.email} className={`form-contact-input`} />
          {error && !input.email && <small className="text-secondary">Enter your email</small>}
        </div>

        <div className="w-full col-span-2">
          <input type="tel" placeholder={`${t("phone")}`} name="phoneNumber" onChange={handleChange} value={input.phoneNumber} className={`form-contact-input`} />
          {error && !input.phoneNumber && <small className="text-secondary">Enter your number phone</small>}
        </div>
        <div className="w-full col-span-2">
          <textarea rows={4} placeholder={`${t("message")}`} onChange={handleChange} value={input.message} name="message" className="form-contact-input" />
          {error && !input.message && <small className="text-secondary">Enter your messages</small>}
        </div>
      </div>
      <Button type="submit" className={`btn-primary w-full ${loading && "animate-pulse"}`}>
        {buttonTitle}
      </Button>
    </form>
  );
};
