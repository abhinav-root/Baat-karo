"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema, loginSchema } from "./_schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function LognPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting },
  } = form;

  async function onSubmit(form: LoginSchema) {}

  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className=" bg-white py-10 px-10 rounded shadow grow max-w-sm">
        <h1 className="text-center font-bold text-2xl mb-10">
          Login to your account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoginButton isSubmitting={isSubmitting} />
            <p className="text-center text-gray-700 text-sm">
              Or Continue with
            </p>
            <Button variant={"outline"} className="w-full" type="button">
              <Image
                priority
                src="google.svg"
                height={20}
                width={20}
                alt="Follow us on Twitter"
                className="mr-2"
              />
              Continue with Google
            </Button>
            <Button variant={"outline"} className="w-full" type="button">
              <Image
                priority
                src="discord.svg"
                height={36}
                width={36}
                alt="Follow us on Twitter"
                className="mr-2"
              />
              Continue with Discord
            </Button>
            <p className="tracking-wide text-center text-gray-700 text-sm">
              Don&apos;t have an account?
              <Link
                className="mx-1 text-blue-500 hover:underline"
                href="/signup"
              >
                Signup
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </main>
  );
}

function LoginButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className={cn("w-full")}>
      Login
    </Button>
  );
}
