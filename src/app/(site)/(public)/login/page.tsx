"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";

import { LoginSchema, loginSchema } from "./_schemas";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { loginWithEmail, loginWithGoogle } from "./_actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LognPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    formState: { isSubmitting, errors },
    setError,
  } = form;

  async function onSubmit(form: LoginSchema) {
    const response = await loginWithEmail(form);
    if (!response.success) {
      setError("root", { message: response.error });
    }
  }

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
            <p className="text-sm text-right relative bottom-6 text-blue-500 hover:underline"><Link href={"/forgot-password"}>Forgot Password?</Link></p>
            <LoginWithEmail isSubmitting={isSubmitting} />
            {errors.root && (
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errors.root?.message}</AlertDescription>
              </Alert>
            )}
            <p className="text-center text-gray-700 text-sm">
              Or Continue with
            </p>
            <Button
              variant={"outline"}
              className="w-full text-gray-600 tracking-wide"
              type="button"
              onClick={() => loginWithGoogle()}
            >
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

function LoginWithEmail({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" className={cn("w-full")} disabled={isSubmitting}>
      Login
      {isSubmitting && <ReloadIcon className="mx-2 h-4 w-4 animate-spin" />}
    </Button>
  );
}
