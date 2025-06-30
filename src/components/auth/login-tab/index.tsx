"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUser from "@/contexts/auth";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const { login } = useUser();

  const formik = useFormik({
    initialValues: { email: "mail12@gmail.com", password: "pass1234" },
    validationSchema,
    onSubmit: async ({ email, password }) => {
      setPending(true);
      console.log("Logging in with", email, password);
      await login(email, password);
      setPending(false);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="user@gmail.com"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <div className="relative">
            <Input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "password"}
              required
            />
            <Button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700 hover:bg-white"
              onClick={() => setShowPassword(!showPassword)}
              size="icon"
              variant={"ghost"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={pending}
          onClick={() => formik.handleSubmit()}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
      </CardContent>
    </Card>
  );
}
