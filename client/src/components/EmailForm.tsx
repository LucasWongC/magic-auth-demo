import { useState, useRef } from "react";
import { toast } from "react-toastify";

interface props {
  onEmailSubmit: Function;
  disabled: boolean;
}
const EmailForm = ({ onEmailSubmit, disabled }: props) => {
  const [email, setEmail] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  const validateEmail = (email: string) => {
    const validRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validRegex.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validateEmail(email);
    if (!isValid) {
      ref.current?.focus();
      toast.warn("Input valid email address");
      return;
    }
    onEmailSubmit(email);
  };

  return (
    <>
      <form className="flex flex-col text-center" onSubmit={handleSubmit}>
        <div className="w-4/5 mx-auto my-5">
          <input
            className="rounded border border-gray-400 p-2 focus:outline-[#6851FF]"
            type="email"
            placeholder="Enter your email"
            value={email}
            ref={ref}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            className="px-6 py-2 rounded-full text-white bg-[#6851FF] hover:bg-[#4E3BDB] duration-300"
            type="submit"
            disabled={disabled}
            onClick={handleSubmit}
          >
            Send Magic Link
          </button>
        </div>
      </form>
    </>
  );
};

export default EmailForm;
