/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Field, FieldDescription } from "../../ui/field";
import { Input } from "../../ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { useSignupMutation } from "../../../redux/features/auth/auth.api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import Password from "../../ui/password";

const formSchema = z
  .object({
    name: z.string().min(3, { error: "Name must be at least 3 characters" }),
    email: z.email(),
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await signup(userInfo).unwrap();
      if (res?.success) {
        toast.success("User created successfully");
        navigate("/verify");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6 w-xl", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john.doe@company.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <div className="grid grid-cols-2 gap-4 my-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Password {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </FieldDescription>
              </Field>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
