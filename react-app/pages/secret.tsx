import { useRouter } from "next/router";
import { useContext } from "react";
import toast from "react-hot-toast";
import Button from "../components/Button";
import { GoogleLoginButton } from "../components/Header";
import { fetchFromAPI } from "../lib/base";
import { UserContext } from "../lib/context";

const SecretPage = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      {user.id ? (
        <div className="flex flex-col space-y-4 justify-center items-center">
          <img
            className="h-[100px] w-[100px] rounded-full"
            src={user.profilePicURL}
          />
          <h4>{user.username}</h4>
          <div className="text-text">@{user.email}</div>
          <Button
            text="Logout"
            onClick={async () => {
              const response = await fetchFromAPI("/auth/logout", {
                method: "GET",
                withCredentials: true,
              });
              if (response[0]) {
                setUser({
                  username: null,
                  email: null,
                  id: null,
                  googleId: null,
                  profilePicURL: null,
                });
                toast(response[0].data.msg, { icon: "😞" });
                router.push("/");
              }
            }}
          />
        </div>
      ) : (
        <GoogleLoginButton />
      )}
    </div>
  );
};

export default SecretPage;
