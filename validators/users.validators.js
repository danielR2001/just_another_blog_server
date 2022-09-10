import { check } from "express-validator";

export const userValidationRules = (method) => {
  switch (method) {
    case "signUp": {
      return [
        check("firstName", "First name cant be empty.").notEmpty(),
        check("lastName", "Last name cant be empty.").notEmpty(),
        check(
          "email",
          "Email cant be empty and must be a valid email."
        ).isEmail(),
        check(
          "password",
          "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, ont symbol and one number"
        ).isStrongPassword(),
      ];
    }
  }
};
