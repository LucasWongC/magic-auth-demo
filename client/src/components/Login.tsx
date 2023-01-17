import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { magic } from "lib/magic";

import EmailForm from "./EmailForm";
import SMSLogin from "./SMSLogin";
import SocialLogins from "./SocialLogin";

const Login = (props: any) => {
  const navigate = useNavigate();
  const { setUser } = props;
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleLoginWithEmail = async (email: string) => {
    try {
      setDisabled(true); // disable login button to prevent multiple emails from being triggered

      // Trigger Magic link to be sent to user
      let didToken = await magic.auth.loginWithMagicLink({
        email,
        redirectURI: new URL("/callback", window.location.origin).href, // optional redirect back to your app after magic link is clicked
      });

      // Validate didToken with server
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        // Set the user to the now logged in user
        const metadata = await magic.user.getMetadata();
        setUser(metadata);
        navigate("/profile");
      }
    } catch (error) {
      setDisabled(false); // re-enable login button - user may have requested to edit their email
      console.log(error);
    }
  };

  const handleLoginWithSocial = async (provider: string) => {
    await magic.oauth.loginWithRedirect({
      provider,
      redirectURI: new URL("/callback", window.location.origin).href, // required redirect to finish social login
    });
  };

  const handleLoginWithSMS = async (phoneNum: string) => {
    try {
      setDisabled(true);
      await magic.auth.loginWithSMS({
        phoneNumber: phoneNum,
      });
      const metadata = await magic.user.getMetadata();
      setUser(metadata)
      navigate("/profile")
    } catch (error) {
      console.log(error);
      setDisabled(false);
    }
  };

  return (
    <>
      <div className="max-w-xs mx-auto mt-10 mb-0 p-4 border border-gray-400 rounded-md text-center shadow-lg shadow-[#f7f7f7] box-border">
        <h3 className="text-lg mt-2">Login</h3>
        <EmailForm disabled={disabled} onEmailSubmit={handleLoginWithEmail} />
        <SMSLogin disabled={disabled} onSMSSubmit={handleLoginWithSMS} />
        <SocialLogins onSubmit={handleLoginWithSocial} />
      </div>
    </>
  );
};

export default Login;
