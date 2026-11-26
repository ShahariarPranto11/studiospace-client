"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MailOpen, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toast";

const inputClass =
  "w-full rounded-xl border border-[#303632] bg-[#171B19] px-3 py-2.5 text-sm text-white placeholder:text-[#929992] outline-none focus:border-[#C5F36A]";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-in/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data?.message || data?.error || "Login failed. Please try again."
        );
      }

      toast.add({
        title: "Login successful",
        description: "Welcome back to StudioSpace.",
        type: "success",
      });

      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed. Please try again.";
      toast.add({
        title: "Login failed",
        description: message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-svh bg-[#111312] px-4 pb-24 pt-8 text-[#F4F5F0] sm:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center gap-2">
          <MailOpen className="size-5 text-[#C5F36A]" aria-hidden="true" />
          <h1 className="text-2xl font-bold tracking-tight">Login</h1>
        </div>

        <p className="mb-8 text-sm text-[#929992]">
          Sign in to your StudioSpace account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#262C28] bg-[#1B1F1D] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                value={formData.password}
                onChange={handleChange}
                className={inputClass}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-2 flex items-center text-[#929992] hover:text-white transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#C5F36A] px-5 py-2.5 text-[#111312] font-bold transition hover:bg-[#D5FF7A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="mt-5 border-t border-[#262C28] pt-5 text-center text-sm text-[#929992]">
            Don&apos;t have an account?{" "}
            <Link
              href="/Registration"
              className="font-medium text-[#C5F36A] hover:underline"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
