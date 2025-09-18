import { memo } from "react";
import type { MainButton } from "../../types/validate.type";
const MainButtonComponent = ({
  type,
  disabled,
  content,
  onclick,
}: MainButton) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={`w-full py-4 rounded-2xl text-white font-roboto text-xl text-nowrap mb-12 leading-[20px] max-lg:text-base ${
        disabled
          ? "bg-primary/60 cursor-not-allowed"
          : "bg-primary hover:bg-primary/80 cursor-pointer"
      }`}
    >
      {content}
    </button>
  );
};
export default memo(MainButtonComponent);
