import { useState } from "react";
import { useLocation } from "@/lib/router";
import { Store, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { getPostModeSwitchPath } from "@/services/auth/modeRedirect";
import { can } from "@/services/auth/permissions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function RoleSwitchFab() {
  const {
    state,
    isAuthenticated,
    canSell,
    effectiveRole,
    setActiveMode,
    upgradeToVendorFromOnboarding,
  } = useAuth();
  const [location, setLocation] = useLocation();
  const [switching, setSwitching] = useState(false);
  const [showStartSellingModal, setShowStartSellingModal] = useState(false);

  if (!isAuthenticated) return null;

  const isCustomerMode = effectiveRole === "customer";
  const isUnregisteredSeller = isCustomerMode && !canSell;
  const Icon = isCustomerMode ? Store : ShoppingBag;
  const label = isCustomerMode ? "Sell goods" : "Buy goods";

  const startVendorOnboarding = async () => {
    setSwitching(true);
    try {
      await upgradeToVendorFromOnboarding();
      setShowStartSellingModal(false);
      setLocation("/vendor/onboarding?step=account");
      toast.success("Vendor onboarding started.");
    } catch {
      toast.error("Unable to start vendor onboarding right now");
    } finally {
      setSwitching(false);
    }
  };

  const switchExistingMode = async () => {
    setSwitching(true);
    try {
      const nextMode = isCustomerMode ? "vendor" : "customer";

      if (nextMode === "vendor" && !can(state, "can_switch_to_vendor_mode")) {
        toast.error("Vendor mode is not available on this account yet.");
        return;
      }

      await setActiveMode(nextMode);
      const nextPath = getPostModeSwitchPath(nextMode, location);
      if (nextPath) setLocation(nextPath);

      toast.success(
        isCustomerMode ? "Switched to seller mode" : "Switched to buyer mode",
      );
    } catch {
      toast.error("Unable to switch mode right now");
    } finally {
      setSwitching(false);
    }
  };

  const handleSwitch = async () => {
    if (switching) return;
    if (isUnregisteredSeller) {
      setShowStartSellingModal(true);
      return;
    }
    await switchExistingMode();
  };

  return (
    <>
      <button
        type="button"
        onClick={handleSwitch}
        disabled={switching}
        className="fixed bottom-24 right-4 z-50 flex items-center gap-2.5 rounded-full border border-gray-200 bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-xl transition-all lg:bottom-6 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
      >
        <Icon className="h-5 w-5" />
        {switching ? "Switching..." : label}
      </button>

      <AlertDialog open={showStartSellingModal} onOpenChange={setShowStartSellingModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start Selling?</AlertDialogTitle>
            <AlertDialogDescription>
              You are not registered as a vendor yet. We will register this account as a vendor
              and take you to onboarding.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={switching}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={startVendorOnboarding} disabled={switching}>
              {switching ? "Starting..." : "Yes, Start Selling"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}


