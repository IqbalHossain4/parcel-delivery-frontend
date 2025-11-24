export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export interface ISendOTP {
  email: string;
}

export interface IVerifyOTP {
  email: string;
  otp: string;
}
