import { googleLogout } from "@react-oauth/google";
import React from "react";
import { useEffect, useState } from "react";
import Oauth from "./Oauth";

const App: React.FC<any> = () => {
  const [userID, setUserID] = useState<any>();

  return (
    <div>
      <Oauth setUserID={setUserID} />
      <div>hello world</div>
    </div>
  );
};

export default App;

export default App;