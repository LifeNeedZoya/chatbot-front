"use client";
import { LoginForm } from "@/components/auth/login-tab";
import { SignupForm } from "@/components/auth/signup-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="space-y-4">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup" className="space-y-4">
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
}
