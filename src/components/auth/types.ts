export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ResetPassword {
  email: string;
}

export interface NewPassword {
  password: string;
  confirmPassword: string;
}

// export type ResetPasswordParams = {
//   uid64: string;
//   token: string;
// }
