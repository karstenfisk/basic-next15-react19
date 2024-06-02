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
import { login } from "@/app/auth/_utils/actions";
import { useForm } from "react-hook-form";
import { type LoginSchemaType, loginResolver } from "@/app/auth/_utils/schema";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const form = useForm<LoginSchemaType>({
    resolver: loginResolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectTo = searchParams.get("to") || "/";

  const onSubmit = async (data: LoginSchemaType) => {
    const res = await login(data, redirectTo);
    if (res) {
      toast.error(res.error);
    }
  };

  return (
    <div className="mx-auto grid w-[350px] gap-6">
      <div className="grid gap-2 text-center">
        <h1 className="text-3xl font-bold">Sign in</h1>
        <p className="text-balance text-muted-foreground">
          Sign in to your account
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    : "The email address you used to sign up."}
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
                    : " Enter your password to sign in."}
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit">Sign In</Button>
        </form>
      </Form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link
          href={
            redirectTo !== "/"
              ? `/auth/register?to=${redirectTo}`
              : "/auth/redirect"
          }
          className="underline"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
