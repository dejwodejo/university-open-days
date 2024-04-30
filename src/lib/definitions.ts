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

const AuthCodeSchema = z.object({
  id: z.number().int(),
  authCode: z.string().length(6),
  contact: z.string().max(100),
  createdAt: z.date(),
});

export type AuthCode = z.infer<typeof AuthCodeSchema>;
