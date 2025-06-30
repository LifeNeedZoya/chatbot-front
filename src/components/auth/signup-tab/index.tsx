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
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [pending, setPending] = useState(false);
  const { signup } = useUser();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async ({ name, email, password }) => {
      setPending(true);
      console.log("Signing up with", name, email, password);
      await signup({ name, email, password });
      setPending(false);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="John Doe"
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="m@example.com"
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Input
              id="signup-password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
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
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
          onClick={() => formik.handleSubmit()}
        >
          {pending ? "Creating account..." : "Create Account"}
        </Button>
      </CardContent>
    </Card>
  );
}
