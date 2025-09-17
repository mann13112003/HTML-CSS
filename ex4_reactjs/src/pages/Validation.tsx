import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputComponent from "../components/Validate/Input";
import MainButtonComponent from "../components/Validate/MainButton";
import SocialButtonComponent from "../components/Validate/SocialButton";
import { login } from "../services/authApi";
import "./Validation.css";
import { toast } from "react-toastify";
import { ROUTES } from "../constant/path.constants";
import Cookies from "js-cookie";
import { useAppDispatch } from "../redux/store";
import { logIn } from "../redux/authSlide";
function LogInPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name: boolean; password: boolean }>({
    name: false,
    password: false,
  });

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  //Check username can only contain letters, numbers, and underscores
  const validateName = (name: string) => {
    const nameRegex = /^[A-Za-z0-9_]+$/;
    return nameRegex.test(name);
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

  const isFormValid = validateName(name) && validatePassword(password);

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setName(value);
      setErrors((prev) => ({
        ...prev,
        name: value.length > 0 && !validateName(value),
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

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const res = await login({ username: name, password: password });
        dispatch(logIn(res.data.data.user));
        if (res.status === 200) {
          Cookies.set("accessToken", res.data.data.accessToken);
          Cookies.set("refreshToken", res.data.data.refreshToken);
          toast.success(`${res.data.message}`);
        }

        navigate(ROUTES.HOME);
      } catch (e) {
        console.error(e);
      }
      setName("");
      setPassword("");
    },
    [name, password, dispatch, navigate]
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
                  label="User Name"
                  placeholder="JohnDoe"
                  type="text"
                  required
                  onChange={handleNameChange}
                  value={name}
                  error={errors.name}
                  errorText="Username can only contain letters, numbers, and underscores!"
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
                  1 uppercase letter and 1 lowercase letter!"
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
                onclick={handleLogin}
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
    </>
  );
}

export default LogInPage;
