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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSigninMutation } from "../../../redux/features/auth/auth.api";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signin] = useSigninMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (userInfo: z.infer<typeof formSchema>) => {
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };
    try {
      const res = await signin(payload).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Login successful");
        navigate("/");
      }
    } catch (error: any) {
      if (error.data.message === "User is not verified") {
        toast.error("Your account is not veryfied");
        navigate("/verify", {
          state: userInfo.email,
        });
      }

      if (error.data.message === "Password does not match") {
        toast.error("Password does not match");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 w-xl", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Email"
                        {...field}
                        value={field.value || ""}
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
                  <FormItem className="my-5">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your Password"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Field className="mb-5">
                <Button type="submit">Login</Button>
              </Field>
            </form>
          </Form>
          <Field>
            <Button className="w-full mb-5" variant="outline" type="button">
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </FieldDescription>
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
