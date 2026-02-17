import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import type { VendorOnboardingDraft } from "@/types/vendorOnboarding";

// Fix Leaflet default marker icon (missing in bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const mapPinIcon = L.divIcon({
  html: renderToStaticMarkup(
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#11248F",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.25))",
      }}
    >
      <MapPin size={28} strokeWidth={2.5} />
    </div>,
  ),
  className: "custom-lucide-map-pin",
  iconSize: [32, 32],
  iconAnchor: [16, 30],
  popupAnchor: [0, -30],
});

// Lusaka, Zambia default
const DEFAULT_CENTER: [number, number] = [-15.3875, 28.3228];
const DEFAULT_ZOOM = 13;

interface AddressMapQuestionProps {
  formData: VendorOnboardingDraft;
  setField: <K extends keyof VendorOnboardingDraft>(key: K, value: VendorOnboardingDraft[K]) => void;
}

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// Inner component to control the map from outside
function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 16, { duration: 1 });
  }, [map, center]);
  return null;
}

export function AddressMapQuestion({ formData, setField }: AddressMapQuestionProps) {
  const [search, setSearch] = useState(formData.address);
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [markerPos, setMarkerPos] = useState<[number, number]>(DEFAULT_CENTER);
  const [mapCenter, setMapCenter] = useState<[number, number]>(DEFAULT_CENTER);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Geocode search input
  const geocodeSearch = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }
    try {
      const params = new URLSearchParams({
        q: query,
        format: "json",
        addressdetails: "1",
        limit: "5",
        countrycodes: "zm",
      });
      const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        headers: { "Accept-Language": "en" },
      });
      const data: NominatimResult[] = await res.json();
      setSuggestions(data);
      setShowSuggestions(data.length > 0);
    } catch {
      setSuggestions([]);
    }
  }, []);

  // Reverse geocode from lat/lng
  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      try {
        const params = new URLSearchParams({
          lat: lat.toString(),
          lon: lng.toString(),
          format: "json",
          addressdetails: "1",
        });
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, {
          headers: { "Accept-Language": "en" },
        });
        const data = await res.json();
        if (data.display_name) {
          setSearch(data.display_name);
          setField("address", data.display_name);
        }
      } catch {
        // Keep existing address on failure
      }
    },
    [setField],
  );

  // Debounced search on input change
  const handleInputChange = (value: string) => {
    setSearch(value);
    setField("address", value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => geocodeSearch(value), 500);
  };

  // Select a suggestion
  const handleSelectSuggestion = (result: NominatimResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setSearch(result.display_name);
    setField("address", result.display_name);
    setMarkerPos([lat, lng]);
    setMapCenter([lat, lng]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Draggable marker event handlers
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const pos = marker.getLatLng();
          setMarkerPos([pos.lat, pos.lng]);
          reverseGeocode(pos.lat, pos.lng);
        }
      },
    }),
    [reverseGeocode],
  );

  return (
    <div className="w-full space-y-3 text-left">
      {/* Search input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400 pointer-events-none" />
          <Input
            value={search}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search for your address..."
            className="h-12 lg:h-14 text-base lg:text-lg rounded-2xl pl-10"
          />
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
            {suggestions.map((s) => (
              <button
                key={s.place_id}
                type="button"
                onMouseDown={() => handleSelectSuggestion(s)}
                className="w-full flex items-start gap-2.5 px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span className="text-gray-700 line-clamp-2">{s.display_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden border border-gray-200">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ height: "300px", width: "100%" }}
          className="lg:!h-[400px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={mapCenter} />
          <Marker
            position={markerPos}
            draggable={true}
            eventHandlers={eventHandlers}
            ref={markerRef}
            icon={mapPinIcon}
          />
        </MapContainer>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Drag the pin to your exact location or search above
      </p>
    </div>
  );
}
