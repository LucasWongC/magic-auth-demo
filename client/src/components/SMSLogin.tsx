import { useState, useRef } from "react";
import { toast } from "react-toastify";

import { validatePhoneNum } from "lib/utils";

interface props {
  onSMSSubmit: Function;
  disabled: boolean;
}

const SMSLogin = ({ onSMSSubmit, disabled }: props) => {
  const [phoneNum, setPhoneNum] = useState<string>("");
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validatePhoneNum(phoneNum);
    if (!isValid) {
      ref.current?.focus();
      toast.warn("Input valid phone number!");
      return;
    }
    onSMSSubmit(phoneNum);
  };

  return (
    <>
      <form className="flex flex-col text-center" onSubmit={handleSubmit}>
        <div className="mx-auto my-5">
          <input
            className="rounded border border-gray-400 p-2 focus:outline-[#6851FF]"
            placeholder="Enter your phone number"
            value={phoneNum}
            ref={ref}
            onChange={(e) => setPhoneNum(e.target.value)}
          />
        </div>
        <div>
          <button
            className="px-6 py-2 rounded-full text-white bg-[#6851FF] hover:bg-[#4E3BDB] duration-300"
            type="submit"
            onClick={handleSubmit}
            disabled={disabled}
          >
            Send code
          </button>
        </div>
      </form>
    </>
  );
};

export default SMSLogin;
