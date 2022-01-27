import { useEffect } from "react";

const SuccessPage = () => {
  useEffect(() => {
    setInterval(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div className="flex items-center justify-center text-center">
      <h1>👍 Login Successful</h1>
    </div>
  );
};

export default SuccessPage;
