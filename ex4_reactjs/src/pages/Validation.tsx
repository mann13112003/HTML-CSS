import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import InputComponent from "../components/Validate/Input";
import MainButtonComponent from "../components/Validate/MainButton";
import SocialButtonComponent from "../components/Validate/SocialButton";
import "./Validation.css";
function FormValidationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [errors, setErrors] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  //Check password must be from 8-32 characters and contain both uppercase and lowercase letters
  const validatePassword = (password: string) => {
    if (password.length < 8 || password.length > 32) {
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    return hasUpperCase && hasLowerCase;
  };

  const isFormValid = validateEmail(email) && validatePassword(password);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      setErrors((prev) => ({
        ...prev,
        email: value.length > 0 && !validateEmail(value),
      }));
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPassword(value);
      setErrors((prev) => ({
        ...prev,
        password: value.length > 0 && !validatePassword(value),
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isFormValid) {
        setshowModal(true);
      }
      setEmail("");
      setPassword("");
    },
    [isFormValid]
  );

  return (
    <>
      <div className="flex flex-row p-8 max-w-[1728px] h-[1140px] gap-8 max-lg:h-[1014px] max-lg:flex-col-reverse max-lg:p-6">
        <div className="relative flex-1 h-full py-[155.5px] flex flex-col items-center max-lg:p-0">
          <div className="max-w-[388px] max-lg:max-w-full">
            <div>
              <h2 className="text-4xl font-semibold text-primary font-roboto mb-7 leading-9">
                Welcome Back👋
              </h2>
              <p className="text-xl font-roboto tracking-[1%] mb-12 max-lg:text-base">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </p>
            </div>
            <form action="#">
              <div className="flex flex-col gap-2 mb-6">
                <InputComponent
                  label="Email"
                  placeholder="Example@email.com"
                  type="email"
                  required
                  onChange={handleEmailChange}
                  value={email}
                  error={errors.email}
                  errorText="Please enter a valid email!"
                />
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <InputComponent
                  label="Password"
                  placeholder="At least 8 characters"
                  type="password"
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  error={errors.password}
                  errorText="Please enter a password of 8-32 characters, containing at least
                  1 uppercase letter and 1 lowercase letter."
                />
              </div>
              <div className="w-full flex justify-end mb-6">
                <Link
                  to="#"
                  className="text-base text-link font-roboto leading-4 max-lg:text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
              <MainButtonComponent
                type="submit"
                disabled={!isFormValid}
                content="Sign In"
                onclick={handleSubmit}
              />
            </form>
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 py-[10px] bg-white text-secondary text-base leading-4 max-lg:hidden">
                  Or
                </span>
                <span className="px-2 py-[10px] bg-white text-secondary text-sm leading-4 lg:hidden">
                  Or sign in with
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-12 gap-4 max-lg:grid max-lg:grid-cols-2">
              <SocialButtonComponent
                image="/svg/Google.svg"
                alt="Google"
                contentDesktop="Sign in with Google"
                contentMobile="Google"
              />
              <SocialButtonComponent
                image="/svg/Facebook.svg"
                alt="Facebook"
                contentDesktop="Sign in with Facebook"
                contentMobile="Facebook"
              />
            </div>
            <div className="w-full text-[18px] flex justify-center max-lg:mb-[57px] max-lg:text-base">
              <span>
                Don't you have an account? {""}
                <Link to="#" className="text-link">
                  Sign up
                </Link>
              </span>
            </div>
            <div className="absolute bottom-0 left-[50%] -translate-x-1/2 text-base text-nowrap max-lg:relative max-lg:text-center max-lg:text-sm">
              © 2023 ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
        <div className="flex-1 bg-[url(/img/Art.png)] h-[1076px] bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden max-lg:max-w-full max-lg:h-[180px] "></div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg p-10 max-w-sm w-full">
            <h3 className="w-full text-green-600 text-center text-xl font-roboto mb-4">
              Login Successfull
            </h3>
            <button
              onClick={() => setshowModal(false)}
              className="w-full text-xl text-white p-2 font-roboto bg-blue-700 rounded-xl cursor-pointer hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FormValidationPage;
