import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { requestOTP } from "@/lib/mockAuth";
import { toast } from "sonner";
import { Mail, Phone } from "lucide-react";

type Method = "phone" | "email";

export default function Login() {
  const [method, setMethod] = useState<Method>("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = method === "phone" ? phone.trim() : email.trim();
    if (!value) {
      toast.error(method === "phone" ? "Please enter your phone number" : "Please enter your email");
      return;
    }

    setLoading(true);
    // Simulate OTP send delay
    setTimeout(() => {
      requestOTP({ method, value, flow: "login" });
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
            <h2 className="text-2xl font-bold text-primary text-center mb-2">Welcome back</h2>
            <p className="text-sm text-muted-foreground text-center mb-6">Sign in to your account</p>

            {/* Method Toggle */}
            <div className="flex rounded-2xl bg-muted p-1 mb-6">
              <button
                type="button"
                onClick={() => setMethod("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  method === "phone"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
              <button
                type="button"
                onClick={() => setMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  method === "email"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {method === "phone" ? (
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
              ) : (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">
              Don't have an account?{" "}
              <Link href="/auth/signup">
                <a className="text-primary font-semibold hover:underline">Sign up</a>
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
