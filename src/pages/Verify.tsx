/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../redux/features/auth/auth.api";

const formSchema = z.object({
  pin: z.string().min(6),
});

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state);
  const [confirm, setConfirm] = useState(false);
  const [sendOTP] = useSendOTPMutation();
  const [verifyOTP] = useVerifyOTPMutation();
  const [otpResentTimer, setOtpResentTimer] = useState(120);

  const handleSendOTP = async () => {
    const toastId = toast.loading("Sending OTP...");

    try {
      const res = await sendOTP({ email: email }).unwrap();
      if (res?.success) {
        toast.success("OTP sent successfully", { id: toastId });
        setConfirm(true);
        setOtpResentTimer(120);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  console.log("location", email);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Verifying OTP...");
    const userInfo = {
      email: email,
      otp: data.pin,
    };

    try {
      const res = await verifyOTP(userInfo).unwrap();
      if (res?.success) {
        toast.success("OTP verified successfully", { id: toastId });
        navigate("/signin");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (email && confirm) {
        setOtpResentTimer((pre) => (pre > 0 ? pre - 1 : 0));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [email, confirm]);

  return (
    <div className="grid place-content-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>Check Your Email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your OTP</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      <Button
                        type="button"
                        disabled={otpResentTimer !== 0}
                        onClick={handleSendOTP}
                        variant="link"
                      >
                        Resent OTP
                      </Button>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Verify;
