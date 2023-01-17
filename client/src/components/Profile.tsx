import { useState, useRef } from "react";
import Web3 from "web3";

import Loading from "./Loading";
import { magic } from "lib/magic";
import { validateEmail } from "lib/utils";
import { toast } from "react-toastify";

const Profile = (props: any) => {
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [network, setNetwork] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { user, setUser } = props;
  const ref = useRef<HTMLInputElement>(null);

  const web3 = new Web3(magic.rpcProvider);

  const updateEmail = async () => {
    try {
      const isValid = validateEmail(email);
      if (!isValid) {
        toast.warn("Input valid email address!");
        ref.current?.focus();
        return;
      }
      await magic.user.updateEmail({
        email: email,
        showUI: true,
      });
      const metadata = await magic.user.getMetadata();
      setUser(metadata);
      setEmail("");
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const network = await web3.eth.getChainId();
      setNetwork(network);
      const address = await web3.eth.getAccounts();
      setAddress(address[0]);
      const balance = await web3.eth.getBalance(address[0]);
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const signMessage = async () => {
    try {
      const signedMessage = await web3.eth.personal.sign(
        message,
        address,
        "password"
      );
      alert(`Signed Message: ${signedMessage}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user?.loading ? (
        <Loading />
      ) : (
        user?.issuer && (
          <>
            <div className="flex">
              <div className="flex-grow">
                <p className=" mx-auto">Email: {user.email}</p>
                <input
                  className="block rounded border border-gray-400 p-2 focus:outline-[#6851FF] my-4"
                  placeholder="Enter new email"
                  value={email}
                  ref={ref}
                  onChange={(e: any) => setEmail(e.target.value)}
                />
                <button
                  className="px-6 py-2 rounded-full text-white bg-[#6851FF] hover:bg-[#4E3BDB] duration-300"
                  onClick={updateEmail}
                >
                  Update Email
                </button>
              </div>
              {user.phoneNumber && (
                <div className="flex-grow">
                  <p>Phone Number: {user.phoneNumber}</p>
                </div>
              )}
            </div>
            <div>
              <div className="mt-8 mx-auto">User Id: {user.issuer}</div>
              <button
                className="px-6 py-2 rounded-full text-white bg-[#6851FF] hover:bg-[#4E3BDB] duration-300 my-4"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            </div>
            {address && (
              <>
                <div className="my-2">
                  <p>Network: {network === 1 && "Ethereum Mainnet"}</p>
                  <p>Address: {address}</p>
                  <p>Balance: {balance}</p>
                </div>
                <div>
                  <label className="block">Message:</label>
                  <textarea
                    className="rounded border border-gray-400 p-2 focus:outline-[#6851FF] mb-2 w-[200px]"
                    onChange={(e: any) => setMessage(e.target.value)}
                  />
                  <label className="block">Password:</label>
                  <input
                    type="password"
                    className="block rounded border border-gray-400 p-2 focus:outline-[#6851FF] mb-2"
                    value={password}
                    onChange={(e: any) => setPassword(e.target.value)}
                  />
                  <button
                    className="px-6 py-2 rounded-full text-white bg-[#6851FF] hover:bg-[#4E3BDB] duration-300 my-4"
                    onClick={signMessage}
                  >
                    Sign Message
                  </button>
                </div>
              </>
            )}
          </>
        )
      )}
    </>
  );
};

export default Profile;
