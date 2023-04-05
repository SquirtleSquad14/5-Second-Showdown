import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface OauthProps {
  setGoogleID: React.Dispatch<React.SetStateAction<any>>;
}

const Oauth: React.FC<OauthProps> = ({ setGoogleID }) => {
  const [user, setUser] = useState([] as any);
  const [profile, setProfile] = useState<any>();

  const login = useGoogleLogin({
    onSuccess: (response: any) => {
      console.log("user data returned at login: ", response);
      setUser(response);
      setGoogleID(response.authuser);
    },
    onError: (error: any) => console.log("Login failed: ", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log("login response: ", res);
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser([]);
    setGoogleID(null);
  };

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.picture} alt="user profile picture" />
          <p>{profile.name}</p>
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Oauth;
