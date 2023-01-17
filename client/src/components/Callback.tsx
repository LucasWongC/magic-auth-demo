import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { magic } from "lib/magic";
import Loading from "./Loading";

const Callback = (props: any) => {
  const { setUser } = props;
  const navigate = useNavigate();

  // The redirect contains a `provider` query param if the user is logging in with a social provider
  useEffect(() => {
    let provider = new URLSearchParams(window.location.search).get("provider");
    provider ? finishSocialLogin() : finishEmailRedirectLogin();
  }, [window.location.search]);

  // `getRedirectResult()` returns an object with user data from Magic and the social provider
  const finishSocialLogin = async () => {
    let result = await magic.oauth.getRedirectResult();
    authenticateWithServer(result.magic.idToken);
  };

  // `loginWithCredential()` returns a didToken for the user logging in
  const finishEmailRedirectLogin = () => {
    let magicCredential = new URLSearchParams(window.location.search).get(
      "magic_credential"
    );
    if (magicCredential)
      magic.auth
        .loginWithCredential()
        .then((didToken: string) => authenticateWithServer(didToken));
  };

  // Send token to server to validate
  const authenticateWithServer = async (didToken: string) => {
    let res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + didToken,
      },
    });

    if (res.status === 200) {
      // Set the user to the now logged in user
      let userMetadata = await magic.user.getMetadata();
      setUser(userMetadata);
      navigate("/profile");
    }
  };

  return <Loading />;
};

export default Callback;
