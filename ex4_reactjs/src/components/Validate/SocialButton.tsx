import { memo } from "react";
import type { SocialButton } from "../../types/validate.type";
const SocialButtonComponent = ({
  image,
  alt,
  contentDesktop,
  contentMobile,
}: SocialButton) => {
  return (
    <button className="flex flex-row items-center justify-center gap-4 bg-bg-social py-3 rounded-xl cursor-pointer">
      <img src={image} alt={alt} />
      <span className="text-base font-roboto text-social leading-4 max-lg:hidden">
        {contentDesktop}
      </span>
      <span className="text-base font-roboto text-social leading-4 lg:hidden">
        {contentMobile}
      </span>
    </button>
  );
};

export default memo(SocialButtonComponent);
