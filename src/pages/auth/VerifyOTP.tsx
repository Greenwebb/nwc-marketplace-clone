import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPendingOTPContact, verifyOTP } from "@/lib/mockAuth";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30;

function maskContact(method: string, value: string) {
  if (method === "email") {
    const [local, domain] = value.split("@");
    if (!domain) return value;
    return `${local.slice(0, 2)}***@${domain}`;
  }
  if (value.length > 4) {
    return `***${value.slice(-4)}`;
  }
  return value;
}

export default function VerifyOTP() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [, setLocation] = useLocation();
  const contact = getPendingOTPContact();

  // Redirect if no pending contact
  useEffect(() => {
    if (!contact) {
      setLocation("/auth/login");
    }
  }, [contact, setLocation]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = useCallback(
    (code: string[]) => {
      const fullCode = code.join("");
      if (fullCode.length !== OTP_LENGTH) return;

      setLoading(true);
      setTimeout(() => {
        const user = verifyOTP(fullCode);
        if (user) {
          toast.success("Verified successfully!");
          setLocation(user.role ? "/" : "/select-role");
        } else {
          toast.error("Invalid OTP. Please try again.");
          setOtp(Array(OTP_LENGTH).fill(""));
          inputRefs.current[0]?.focus();
        }
        setLoading(false);
      }, 600);
    },
    [setLocation],
  );

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits filled
    if (value && newOtp.every((d) => d !== "")) {
      handleVerify(newOtp);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);

    if (pasted.length === OTP_LENGTH) {
      handleVerify(newOtp);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleResend = () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_COOLDOWN);
    toast.success("OTP resent!");
  };

  if (!contact) return null;

  const backPath = contact.flow === "signup" ? "/auth/signup" : "/auth/login";

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
            {/* Back link */}
            <Link href={backPath}>
              <a className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </a>
            </Link>

            <h2 className="text-2xl font-bold text-primary text-center mb-2">Verify OTP</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Enter the 6-digit code sent to{" "}
              <span className="font-medium text-foreground">
                {maskContact(contact.method, contact.value)}
              </span>
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  disabled={loading}
                  className="w-12 h-14 text-center text-xl font-bold rounded-2xl border border-input bg-transparent focus:outline-none focus:ring-[3px] focus:ring-ring/50 focus:border-primary transition-all disabled:opacity-50"
                />
              ))}
            </div>

            <Button
              onClick={() => handleVerify(otp)}
              disabled={loading || otp.some((d) => d === "")}
              className="w-full h-12 rounded-2xl bg-primary text-white font-semibold hover:bg-primary/90"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>

            {/* Resend */}
            <p className="text-sm text-muted-foreground text-center mt-6">
              Didn't receive the code?{" "}
              {resendTimer > 0 ? (
                <span className="text-muted-foreground">
                  Resend in {resendTimer}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  className="text-primary font-semibold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
