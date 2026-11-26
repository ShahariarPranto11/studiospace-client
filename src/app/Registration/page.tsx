"use client";

import { type FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MailOpen, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-[#303632] bg-[#171B19] px-3 py-2.5 text-sm text-white placeholder:text-[#929992] outline-none focus:border-[#C5F36A]";

const passwordRules = [
  {
    test: (password: string) => /[A-Z]/.test(password),
    label: "One uppercase letter",
  },
  {
    test: (password: string) => /[a-z]/.test(password),
    label: "One lowercase letter",
  },
  {
    test: (password: string) => password.length >= 6,
    label: "At least 6 characters",
  },
];

export default function RegistrationPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordValid = (value: string) =>
    passwordRules.every((rule) => rule.test(value));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPasswordValid(password)) {
      setPasswordError("Password must meet all of the requirements.");
      return;
    }

    setPasswordError(null);
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: photoUrl || undefined,
    });

    setLoading(false);

    if (error) {
      setPasswordError(error.message || "Registration failed.");
      return;
    }

    router.push("/");
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    setLoading(false);
  };

  return (
    <main className="min-h-svh bg-[#111312] px-4 pb-24 pt-8 text-[#F4F5F0] sm:px-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center gap-2">
          <MailOpen className="size-5 text-[#C5F36A]" aria-hidden="true" />
          <h1 className="text-2xl font-bold tracking-tight">Registration</h1>
        </div>

        <p className="mb-8 text-sm text-[#929992]">
          Create your StudioSpace account to get started.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl border border-[#262C28] bg-[#1B1F1D] p-6 sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              required
              aria-invalid={!name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
              required
              aria-invalid={!email}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photoUrl">Photo URL</Label>
            <Input
              id="photoUrl"
              name="photoUrl"
              type="url"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              className={inputClass}
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
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setPasswordError(null);
                }}
                className={inputClass}
                required
                aria-invalid={passwordError !== null}
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
            {passwordError && (
              <p className="text-[11px] font-medium text-destructive">
                {passwordError}
              </p>
            )}
            <div className="flex items-center gap-1 text-[10px] text-[#929992]">
              {passwordRules.map((rule) => (
                <span
                  key={rule.label}
                  className={cn(
                    "flex items-center gap-1",
                    rule.test(password)
                      ? "text-green-400/60"
                      : "text-[#929992]",
                  )}
                >
                  {rule.test(password) ? "✓" : "○"}
                  {rule.label}
                </span>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#C5F36A] px-5 py-2.5 text-[#111312] font-bold transition hover:bg-[#D5FF7A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </Button>

          <div className="mt-5 border-t border-[#262C28] pt-5 text-center text-sm text-[#929992]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#C5F36A] hover:underline"
            >
              Login
            </Link>
          </div>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <span
                className="w-full border-t border-[#262C28]"
                aria-hidden="true"
              />
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider text-[#929992]">
              <span className="bg-[#1B1F1D] px-2">Or continue with</span>
            </div>
          </div>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full rounded-full border-[#303632] bg-transparent px-4 py-2.5 text-xs text-[#F4F5F0] hover:bg-[#1B1F1D]"
            >
              Google
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
