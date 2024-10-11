import type { ContentMap } from "@/types/register";

import { buttonVariants } from "@motion-metrics/ui/components/ui/button";

import { login, signup } from "@/lib/actions/server/auth";

export const REGISTRATION_CONTENT_MAP: ContentMap = {
  intro: {
    type: "intro",
    heading: "Welcome to MotionMetrics",
    paragraph:
      "Transform your fitness journey into a captivating story. Track, celebrate, and grow with every workout",
    buttons: [
      {
        label: "Get Started",
        linkTo: "register",
        nextStep: "registerStepOne",
        buttonVariant: buttonVariants({ variant: "default" }),
      },
      {
        label: "Already have an account?",
        linkTo: "login",
        nextStep: "login",
        buttonVariant: buttonVariants({ variant: "outline" }),
      },
    ],
  },
  registerStepOne: {
    type: "register",
    step: 1,
    heading: "Create Account",
    paragraph:
      "Your fitness story begins here. Create an account to log your activities, celebrate milestones, and watch your progress unfold.",
    blocks: [
      {
        name: "Email",
        placeholder: "Fill in your email address",
        type: "email",
        id: "email",
      },
      {
        name: "Password",
        placeholder: "Fill in your password",
        type: "password",
        id: "password",
      },
      {
        name: "Password confirmation",
        placeholder: "Confirm your password",
        type: "password",
        id: "password_cinfirmation",
      },
    ],
    buttons: [
      {
        label: "Continue",
        linkTo: "#",
        nextStep: "registerStepTwo",
        buttonVariant: buttonVariants({ variant: "default" }),
      },
    ],
  },
  registerStepTwo: {
    type: "register",
    step: 2,
    heading: "Personalize Account",
    paragraph:
      "You’re almost there! Create your new account for {{ email }} by completing the details below.",
    blocks: [
      {
        name: "First Name",
        placeholder: "Fill in your first name",
        type: "text",
        id: "first_name",
      },
      {
        name: "Last Name",
        placeholder: "Fill in your last name",
        type: "text",
        id: "last_name",
      },
      {
        name: "Accept terms and condition",
        type: "checkbox",
        id: "accept_terms",
      },
    ],
    cta: {
      label: "Create Account",
      onClick: signup,
      buttonVariant: buttonVariants({ variant: "default" }),
    },
  },
  login: {
    type: "login",
    heading: "Welcome back",
    paragraph: "Welcome back. Ready to pick up where you left off?",
    blocks: [
      {
        name: "Email",
        placeholder: "Fill in your email address",
        type: "email",
        id: "email",
      },
      {
        name: "Password",
        placeholder: "Fill in your password",
        type: "password",
        id: "password",
      },
    ],
    cta: {
      label: "Log in",
      onClick: login,
      buttonVariant: buttonVariants({ variant: "default" }),
    },
  },
};
