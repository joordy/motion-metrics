import type { buttonVariants } from "@motion-metrics/ui/components/ui/button";

export interface ButtonType {
  label: string;
  linkTo?: string;
  nextStep: string;
  buttonVariant: ReturnType<typeof buttonVariants>;
}

export interface InputBlock {
  name: string;
  placeholder?: string;
  type: "email" | "password" | "text" | "checkbox";
  id: string;
}

export interface CTA {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: any;
  buttonVariant: ReturnType<typeof buttonVariants>;
}

export interface BaseContent {
  type: "intro" | "register" | "login";
  heading: string;
  paragraph: string;
}

export interface IntroContent extends BaseContent {
  type: "intro";
  buttons: ButtonType[];
}

export interface RegisterStepContent extends BaseContent {
  type: "register";
  step: number;
  blocks: InputBlock[];
  buttons?: ButtonType[];
  cta?: CTA;
}

export interface LoginContent extends BaseContent {
  type: "login";
  blocks: InputBlock[];
  cta: CTA;
}

export type ContentMap = {
  intro: IntroContent;
  registerStepOne: RegisterStepContent;
  registerStepTwo: RegisterStepContent;
  login: LoginContent;
};
