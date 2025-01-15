import { z } from "zod";

const userValidatorSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
    role: z.enum(["admin", "user"]).default("user"),
  }),
});

const userLogInValidatorSchema = z.object({
  body: z.object({
    
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
   
  }),
});

export const userValidator ={ userValidatorSchema, userLogInValidatorSchema };
