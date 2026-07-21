"use client";
import { useSearchParams } from "next/navigation";
import MapaAsientos from "@/components/Asientos/MapaAsientos";

export default function Page() {
  const searchParams = useSearchParams();
  const peliculaId = searchParams.get("peliculaId");

  return <MapaAsientos peliculaId={peliculaId} />;
}