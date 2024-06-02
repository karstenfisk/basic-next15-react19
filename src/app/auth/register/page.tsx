"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { register } from "@/app/auth/_utils/actions";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import {
  type RegistrationFormSchemaType,
  registrationResolver,
} from "@/app/auth/_utils/schema";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const form = useForm<RegistrationFormSchemaType>({
    resolver: registrationResolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const redirectTo = searchParams.get("to") || "/";

  const onSubmit = async (data: RegistrationFormSchemaType) => {
    const res = await register(data, redirectTo);

    if (res?.type === "validationError") {
      form.setError("confirmPassword", {
        type: "manual",
        message: res.error,
      });
      return;
    } else if (res?.error) {
      toast.error(res.error);
      return;
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <p className="text-balance text-muted-foreground">
          Create an account to get started
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error
                      ? "text-destructive"
                      : "text-muted-foreground",
                    "text-[0.8rem] leading-tight"
                  )}
                >
                  {fieldState.error?.message
                    ? fieldState.error.message
                    : "Your email address."}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error
                      ? "text-destructive"
                      : "text-muted-foreground",
                    "text-[0.8rem] leading-tight"
                  )}
                >
                  {fieldState.error?.message
                    ? fieldState.error.message
                    : "Your full name."}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error
                      ? "text-destructive"
                      : "text-muted-foreground",
                    "text-[0.8rem] leading-tight"
                  )}
                >
                  {fieldState.error?.message
                    ? fieldState.error.message
                    : "8 characters minimum, with at least one uppercase letter, one lowercase letter, and one special character."}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <FormItem className="pb-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormDescription
                  className={cn(
                    fieldState.error
                      ? "text-destructive"
                      : "text-muted-foreground",
                    "text-[0.8rem] leading-tight"
                  )}
                >
                  {fieldState.error?.message
                    ? fieldState.error.message
                    : "Re-enter your password to confirm."}
                </FormDescription>{" "}
              </FormItem>
            )}
          />

          <Button type="submit" className="">
            Submit
          </Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="underline">
          Sign In
        </Link>
      </div>
    </div>
  );
}
