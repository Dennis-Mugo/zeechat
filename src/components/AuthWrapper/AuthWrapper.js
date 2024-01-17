import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatteContext } from "../../config/context";

function AuthWrapper({ Page }) {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, fetchUser } = useContext(ChatteContext);
  const [authStatus, setAuthStatus] = useState("no-auth");
  //no-auth, loading, authenticated
  useEffect(() => {
    fetchAuth();
  }, []);

  const fetchAuth = async () => {
    setAuthStatus("loading");
    if (currentUser) {
      setAuthStatus("authenticated");
      return;
    }
    let user = await fetchUser();
    if (user) {
      setCurrentUser(user);
      setAuthStatus("authenticated");
      return;
    }
    navigate("/home");
  };

  return <>{authStatus === "authenticated" ? <Page /> : <></>}</>;
}

export default AuthWrapper;
