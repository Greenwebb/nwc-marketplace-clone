import { CheckCircle2 } from "lucide-react";
import { Link } from "@/lib/router";

type ThankYouStateProps = {
  title?: string;
  message?: string;
  orderNumber?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
};

export default function ThankYouState({
  title = "Thank you for your order",
  message = "Your order has been received and is now being prepared.",
  orderNumber,
  primaryActionLabel = "Continue shopping",
  primaryActionHref = "/shop",
  secondaryActionLabel = "Track order",
  secondaryActionHref = "/track-order",
}: ThankYouStateProps) {
  return (
    <section className="rounded-2xl border border-[#DADFE3] bg-white p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-9 w-9 text-green-600" />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-primary">{title}</h1>
      <p className="mx-auto max-w-xl text-sm text-[#7C818B]">{message}</p>
      {orderNumber && (
        <p className="mt-4 text-sm font-medium text-primary">
          Order Number: <span className="text-[#172a9c]">{orderNumber}</span>
        </p>
      )}

      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link href={primaryActionHref}>
          <a className="inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-primary px-6 text-sm font-medium text-white hover:bg-[#0d1c6e]">
            {primaryActionLabel}
          </a>
        </Link>
        <Link href={secondaryActionHref}>
          <a className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#DADFE3] px-6 text-sm font-medium text-primary hover:bg-[#fff]">
            {secondaryActionLabel}
          </a>
        </Link>
      </div>
    </section>
  );
}

