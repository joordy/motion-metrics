export interface FunnelConfig {
  heading: string;
  paragraph: string;
}

export interface InputField {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: boolean;
}

export interface RegistrationStepOne extends FunnelConfig {
  fields: {
    [key: string]: InputField;
  };
}

export interface RegistrationStepTwo extends FunnelConfig {
  fields: {
    [key: string]: InputField;
  };
}

export interface Login extends FunnelConfig {
  fields: {
    [key: string]: InputField;
  };
}
