import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { fetchFromAPI } from "../lib/base";
import { IUser, UserContext } from "../lib/context";
import "../styles/main.scss";

const MyApp = ({ Component, pageProps }) => {
  const [user, setUser] = useState<IUser>({
    username: null,
    email: null,
    id: null,
    googleId: null,
    profilePicURL: null,
  });

  useEffect(() => {
    const fetchAuthUser = async () => {
      const response = await fetchFromAPI("/auth/user", {
        method: "GET",
        withCredentials: true,
      });
      if (response[1] !== null) {
      } else {
        const {
          username,
          email,
          _id: id,
          profilePicURL,
          googleId,
        } = response[0].data.data.user;
        setUser({ username, email, id, profilePicURL, googleId });
      }
    };
    fetchAuthUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Header />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
};

export default MyApp;
