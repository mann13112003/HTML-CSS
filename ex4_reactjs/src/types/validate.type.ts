export interface Input {
  label: string;
  placeholder?: string;
  type: string;
  required?: boolean;
  errorText: string;
  error: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface MainButton {
  type: "submit" | "reset" | "button" | undefined;
  disabled: boolean;
  content?: React.ReactNode;
  onclick: (e: React.FormEvent) => void;
}

export interface SocialButton {
  image: string;
  alt: string;
  contentDesktop: string;
  contentMobile: string;
}

export interface User {
  id: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface UserProfile {
  success: boolean;
  message: string;
  data: {
    user: Omit<User, "createAt" | "updateAt">;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data?: object;
  error: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
