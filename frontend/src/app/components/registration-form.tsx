"use client";

import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registrationSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  return (
    <form
      className="w-full max-w-xs"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel className="text-lg" htmlFor="username">
              Username
            </FieldLabel>
            <Input
              className="py-5 text-lg"
              id="username"
              type="text"
              placeholder="Max Leiter"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-lg" htmlFor="email">
              Email
            </FieldLabel>
            <Input
              className="py-5"
              id="email"
              type="email"
              placeholder="max@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </Field>
          <Field>
            <FieldLabel className="text-lg" htmlFor="password">
              Password
            </FieldLabel>
            <Input
              className="py-5"
              id="password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </Field>
        </FieldGroup>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md w-full"
        >
          Register
        </button>
      </FieldSet>
    </form>
  );
}
