import { useMemo, useState } from "react";
import { Link } from "@/lib/router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, CircleHelp, Mail, ShoppingBasket, Star, Store as StoreIcon } from "lucide-react";
import { vendorStores } from "./vendorStoreData";

const categories = Array.from(new Set(vendorStores.map((store) => store.category)));
const locations = Array.from(new Set(vendorStores.map((store) => store.location)));
const PAGE_SIZE = 6;

export default function StoreListing() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minimumRating, setMinimumRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStores = useMemo(() => {
    return vendorStores.filter((store) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(store.category);
      const locationMatch =
        selectedLocations.length === 0 || selectedLocations.includes(store.location);
      const verifiedMatch = !verifiedOnly || store.verified;
      const ratingMatch = store.rating >= minimumRating;

      return categoryMatch && locationMatch && verifiedMatch && ratingMatch;
    });
  }, [minimumRating, selectedCategories, selectedLocations, verifiedOnly]);

  const totalPages = Math.max(1, Math.ceil(filteredStores.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedStores = filteredStores.slice(start, start + PAGE_SIZE);

  const toggleFromList = (
    value: string,
    values: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value]);
    setCurrentPage(1);
  };

  const getStoreEmail = (id: string, index: number) =>
    `${id.replace(/-/g, ".")}${(index + 21).toString(36)}@gmail.com`;

  return (
    <div className="min-h-screen bg-[#fff]">
      <Header />
      <main className="container py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary">Vendor Stores</h1>
          <p className="text-sm text-[#7C818B]">Browse independent storefronts on the marketplace.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="rounded-2xl border border-[#DADFE3] bg-white p-4 h-fit lg:sticky lg:top-24">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-primary">Category</h2>
              <div className="mt-3 space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center gap-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() =>
                        toggleFromList(category, selectedCategories, setSelectedCategories)
                      }
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm text-primary">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5 border-t border-[#ECF0F4] pt-5">
              <h2 className="text-sm font-semibold text-primary">Location</h2>
              <div className="mt-3 space-y-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center gap-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() =>
                        toggleFromList(location, selectedLocations, setSelectedLocations)
                      }
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm text-primary">
                      {location}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ECF0F4] pt-5">
              <h2 className="text-sm font-semibold text-primary">Store Quality</h2>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="verified-only"
                    checked={verifiedOnly}
                    onCheckedChange={() => {
                      setVerifiedOnly((value) => !value);
                      setCurrentPage(1);
                    }}
                  />
                  <Label htmlFor="verified-only" className="text-sm text-primary">
                    Verified stores only
                  </Label>
                </div>

                <div>
                  <Label htmlFor="min-rating" className="text-sm text-primary">
                    Minimum rating: {minimumRating.toFixed(1)}
                  </Label>
                  <input
                    id="min-rating"
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={minimumRating}
                    onChange={(event) => {
                      setMinimumRating(Number(event.target.value));
                      setCurrentPage(1);
                    }}
                    className="mt-2 w-full"
                  />
                </div>
              </div>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-[#7C818B]">
                Showing {pagedStores.length} of {filteredStores.length} stores
              </span>
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedLocations([]);
                  setVerifiedOnly(false);
                  setMinimumRating(0);
                  setCurrentPage(1);
                }}
                className="font-medium text-[#172a9c] hover:underline"
              >
                Reset filters
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {pagedStores.map((store, cardIndex) => (
                <article key={store.id} className="overflow-hidden rounded-sm border border-[#DADFE3] bg-white shadow-sm">
                  <div className="relative">
                    <img src={store.banner} alt={store.name} className="h-[320px] w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/28 to-transparent" />

                    <div className="absolute left-8 top-8 text-white">
                      <h3 className="text-4xl font-bold leading-none tracking-tight">{store.name}</h3>
                      <div className="mt-4 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={`${store.id}-star-${index}`} className="h-4 w-4 fill-white text-white" />
                        ))}
                      </div>
                      <p className="mt-5 flex items-center gap-2 text-[15px] font-semibold">
                        <Mail className="h-4 w-4" />
                        {getStoreEmail(store.id, cardIndex)}
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-end bg-[#efefef] px-8 py-7">
                    <div className="absolute -top-16 left-7 h-32 w-32 rounded-full bg-white p-2 shadow-md">
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-[#27adc7]">
                        <StoreIcon className="h-12 w-12 text-[#1d2a3d]" strokeWidth={2.2} />
                        <ShoppingBasket className="absolute bottom-4 right-4 h-7 w-7 text-[#f4f7fb]" strokeWidth={2.2} />
                      </div>
                    </div>

                    <div className="ml-[136px] flex w-full flex-wrap justify-end gap-4">
                      <button className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-2xl border border-[#0a8ea5] bg-[#13a9be] px-6 text-lg font-semibold text-white hover:bg-[#1197aa]">
                        <CircleHelp className="h-5 w-5" />
                        Inquiry
                      </button>
                      <Link href={`/store/vendor/${store.id}`}>
                        <a className="inline-flex min-h-[42px] items-center justify-center rounded-2xl bg-[#1f2937] px-9 text-lg font-semibold text-white hover:bg-[#111827]">
                          Visit
                        </a>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                disabled={safePage === 1}
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-[#DADFE3] px-3 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-h-[40px] min-w-[40px] rounded-xl border text-sm ${
                    page === safePage
                      ? "border-primary bg-primary text-white"
                      : "border-[#DADFE3] text-primary"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                className="inline-flex min-h-[40px] items-center gap-1 rounded-xl border border-[#DADFE3] px-3 text-sm text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

