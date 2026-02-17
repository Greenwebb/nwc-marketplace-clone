import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { requestOTP } from "@/lib/mockAuth";
import { toast } from "sonner";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      toast.error("Please enter your email or phone number");
      return;
    }

    setLoading(true);
    const method = phone.trim() ? "phone" : "email";
    const value = phone.trim() || email.trim();

    setTimeout(() => {
      requestOTP({ method, value, flow: "signup", name: name.trim() });
      toast.success(`OTP sent to your ${method}`);
      setLoading(false);
      setLocation("/auth/verify");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ECF0F4] px-4">
      <div className="w-full max-w-md">
        {/* Brand Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <a className="inline-block">
              <h1 className="text-3xl font-bold text-primary">
                New<span className="text-secondary">world</span>
              </h1>
              <p className="text-[11px] tracking-wide text-muted-foreground">Marketplace</p>
            </a>
          </Link>
        </div>

        <Card className="rounded-2xl shadow-sm border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-primary text-center mb-2">Create account</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">Join Newworld Marketplace</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center h-12 px-3 rounded-2xl border bg-muted text-sm font-medium text-muted-foreground min-w-[72px]">
                    +260
                  </div>
                  <Input
                    type="tel"
                    placeholder="97 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              Already have an account?{" "}
              <Link href="/auth/login">
                <a className="text-primary font-semibold hover:underline">Log in</a>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
