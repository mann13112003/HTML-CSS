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
