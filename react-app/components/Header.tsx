import { motion } from "framer-motion";
import Link from "next/link";
import Button from "./Button";
import { toast } from "react-hot-toast";
import { fetchFromAPI } from "../lib/base";
import { useContext } from "react";
import { UserContext } from "../lib/context";

// Button won't work here, only href work
// Stackoverflow post - https://stackoverflow.com/questions/63861882/can-anyone-share-an-example-of-next-js-with-passport-google-oauth2-integration#:~:text=import%20nextConnect%20from%20'next%2Dconnect,openid'%5D%2C%20%7D))%20handler.
const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <motion.header
      initial={{ opacity: 0, y: -180 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 1, delay: 0.6 }}
      className="flex justify-between items-center mx-16 my-10"
    >
      <div className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-br from-lightPink to-lightPurple">
        OAuth
      </div>
      <nav className="flex space-x-12 list-none font-medium">
        <li className="hover:bg-card px-[24px] py-[12px] rounded-xl hover:shadow-md transition-all">
          <Link href="/secret">
            <a>Secret</a>
          </Link>
        </li>
        {user.id ? (
          <li>
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={user.profilePicURL}
            />
          </li>
        ) : (
          <li>
            <GoogleLoginButton />
          </li>
        )}
      </nav>
    </motion.header>
  );
};

export const GoogleLoginButton = () => {
  const { user, setUser } = useContext(UserContext);

  const fetchAuthUser = async () => {
    const response = await fetchFromAPI("/auth/user", {
      method: "GET",
      withCredentials: true,
    });
    if (response[1] !== null) toast.error("Login failed, Please try again");
    else {
      const {
        username,
        email,
        _id: id,
        profilePicURL,
        googleId,
      } = response[0].data.data.user;
      setUser({ username, email, id, profilePicURL, googleId });
      toast(`Hi ${response[0].data.data.user.username}`, { icon: "👋" });
    }
  };

  const redirectToGoogleLoginPage = async () => {
    let timer: NodeJS.Timeout | null = null;

    const googleLoginURL = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/auth/login/google`;
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=500,height=600"
    );

    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          fetchAuthUser();
          if (timer) clearInterval(timer);
        }
      }, 500);
    }
  };

  return (
    <Button text="Login with Google" onClick={redirectToGoogleLoginPage} />
  );
};

export default Header;
