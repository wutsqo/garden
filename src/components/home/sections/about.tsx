"use client";

import { useEffect, useRef, useState } from "react";
import Map, { Marker, type MapRef } from "react-map-gl";
import SectionTitle from "../components/section-title";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = "mapbox://styles/wutsqo/clecpt0sg000001rzc396f1ku";

const SHOTS = [
  { center: [118, -3], zoom: 3.2, pitch: 25, bearing: -8, duration: 6500 },
  { center: [106.83, -6.18], zoom: 8, pitch: 40, bearing: -16, duration: 7000 },
  { center: [106.826, -6.2], zoom: 10.5, pitch: 52, bearing: -24, duration: 8000 },
] as const;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

const getVisibility = (progress: number, start: number, end: number) => {
  if (progress <= start || progress >= end) return 0;
  const midpoint = (start + end) / 2;
  const halfRange = (end - start) / 2;
  return clamp(1 - Math.abs(progress - midpoint) / halfRange, 0, 1);
};

const getCameraFromProgress = (progress: number) => {
  const safeProgress = clamp(progress, 0, 1);
  const segmentCount = SHOTS.length - 1;
  const scaledProgress = safeProgress * segmentCount;
  const segmentIndex = Math.min(Math.floor(scaledProgress), segmentCount - 1);
  const segmentProgress = scaledProgress - segmentIndex;

  const from = SHOTS[segmentIndex];
  const to = SHOTS[segmentIndex + 1];

  return {
    center: [
      lerp(from.center[0], to.center[0], segmentProgress),
      lerp(from.center[1], to.center[1], segmentProgress),
    ] as [number, number],
    zoom: lerp(from.zoom, to.zoom, segmentProgress),
    pitch: lerp(from.pitch, to.pitch, segmentProgress),
    bearing: lerp(from.bearing, to.bearing, segmentProgress),
  };
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<MapRef>(null);
  const frameRef = useRef<number | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);

    onChange();
    media.addEventListener("change", onChange);

    return () => {
      media.removeEventListener("change", onChange);
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    if (prefersReducedMotion) {
      const staticShot = SHOTS[1];
      mapRef.current.jumpTo({
        center: staticShot.center as [number, number],
        zoom: staticShot.zoom,
        pitch: staticShot.pitch,
        bearing: staticShot.bearing,
      });
      return;
    }

    const updateFromScroll = () => {
      if (!sectionRef.current || !mapRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalTravel = viewportHeight + rect.height;
      const nextProgress = clamp((viewportHeight - rect.top) / totalTravel, 0, 1);
      const camera = getCameraFromProgress(nextProgress);

      setProgress((prev) => (Math.abs(prev - nextProgress) > 0.01 ? nextProgress : prev));

      mapRef.current.jumpTo({
        center: camera.center,
        zoom: camera.zoom,
        pitch: camera.pitch,
        bearing: camera.bearing,
      });
    };

    const requestUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        updateFromScroll();
        frameRef.current = null;
      });
    };

    updateFromScroll();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [mapLoaded, prefersReducedMotion]);

  const indonesiaMarkerOpacity = getVisibility(progress, 0.02, 0.42);
  const jakartaMarkerOpacity = getVisibility(progress, 0.28, 0.75);
  const localMarkerOpacity = getVisibility(progress, 0.56, 1);

  return (
    <section
      className="relative isolate mt-24 h-[100svh] min-h-[38rem] overflow-hidden border-y border-black bg-[#080808] text-white md:h-[100vh]"
      ref={sectionRef}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ filter: `saturate(${0.62 + progress * 0.28}) brightness(0.86) contrast(1.06)` }}
      >
        {TOKEN ? (
          <Map
            ref={mapRef}
            mapLib={import("mapbox-gl")}
            style={{ width: "100%", height: "100%" }}
            mapStyle={MAP_STYLE}
            mapboxAccessToken={TOKEN}
            onLoad={() => setMapLoaded(true)}
            initialViewState={{
              latitude: SHOTS[0].center[1],
              longitude: SHOTS[0].center[0],
              zoom: SHOTS[0].zoom,
              pitch: SHOTS[0].pitch,
              bearing: SHOTS[0].bearing,
            }}
            interactive={false}
            dragPan={false}
            scrollZoom={false}
            boxZoom={false}
            dragRotate={false}
            doubleClickZoom={false}
            keyboard={false}
            touchZoomRotate={false}
            attributionControl={false}
          >
            <Marker longitude={118} latitude={-3} anchor="center">
              <div
                className="h-3 w-3 rounded-full border border-white/85 bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.38)] motion-reduce:transition-none"
                style={{ opacity: indonesiaMarkerOpacity }}
              />
            </Marker>
            <Marker longitude={106.83} latitude={-6.18} anchor="center">
              <div
                className="h-3 w-3 rounded-full border border-white/85 bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.38)] motion-reduce:transition-none"
                style={{ opacity: jakartaMarkerOpacity }}
              />
            </Marker>
            <Marker longitude={106.826} latitude={-6.2} anchor="center">
              <div
                className="h-3 w-3 rounded-full border border-white/85 bg-white/90 shadow-[0_0_0_6px_rgba(255,255,255,0.15),0_0_24px_rgba(255,255,255,0.38)] motion-reduce:transition-none"
                style={{ opacity: localMarkerOpacity }}
              />
            </Marker>
          </Map>
        ) : null}
      </div>

      <div className="relative z-50 container mx-auto px-6 py-10 md:py-24">
        <div className="relative z-50 max-w-[46rem] rounded border border-black bg-white p-4 pt-0 text-[#101010] shadow-[2px_2px_#1a1a1a] motion-reduce:animate-none md:p-8">
          <div className="-mt-8">
            <SectionTitle number="📋" title="About" />
          </div>
          <p className="-mt-8 max-w-[36rem] text-base leading-[1.7] md:text-[1.09rem] md:leading-[1.75]">
            Hi, I am <strong>Wutsqo / Uko</strong> (he/him), a Jakarta-based Creative Developer. I indulge in{" "}
            <strong>web technologies</strong> both for fun and for a living.
          </p>
          <div className="mt-5 mb-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-black bg-white/80 px-3 py-1 text-[0.78rem] leading-[1.2] tracking-[0.04em] uppercase">
              Jakarta
            </span>
            <span className="rounded-full border border-black bg-white/80 px-3 py-1 text-[0.78rem] leading-[1.2] tracking-[0.04em] uppercase">
              Creative Developer
            </span>
            <span className="rounded-full border border-black bg-white/80 px-3 py-1 text-[0.78rem] leading-[1.2] tracking-[0.04em] uppercase">
              Craft + Engineering
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
