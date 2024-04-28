import { z } from "zod";

export const PhoneNrLoginSchema = z.object({
  phoneNr: z.string().trim().length(9),
});

export const EmailLoginSchema = z.object({
  email: z.string().trim().email(),
});

export type LoginFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
