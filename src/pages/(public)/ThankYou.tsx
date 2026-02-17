import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThankYouState from "@/components/ThankYouState";
import { useSearch } from "@/lib/router";

export default function ThankYou() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const order = params.get("order") ?? "NWC-000000";

  return (
    <div className="min-h-screen bg-[#fff]">
      <Header />
      <main className="container py-10">
        <ThankYouState
          orderNumber={order}
          message="We emailed your receipt and will notify you once your order ships."
        />
      </main>
      <Footer />
    </div>
  );
}

