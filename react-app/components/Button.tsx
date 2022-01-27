import { MouseEventHandler } from "react";

interface Props {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="bg-secondary text-primary text-base font-medium px-[24px] py-[12px] rounded-xl shadow-md hover:brightness-90 transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
