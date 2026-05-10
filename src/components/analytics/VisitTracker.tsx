"use client";

import { useEffect } from "react";
import { trackLandingVisit } from "@/lib/tracking";

export function VisitTracker() {
  useEffect(() => {
    trackLandingVisit();
  }, []);

  return null;
}

