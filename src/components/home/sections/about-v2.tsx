"use client";

import { useEffect, useRef } from "react";
import s from "./about-v2.module.css";
import Map from "react-map-gl";
import SectionTitle from "../components/section-title";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = "mapbox://styles/wutsqo/clecs3mtt001201p0cghlbuc3";
const ZOOM = [
  {
    center: [118.0, -3],
    zoom: 2.5,
  },
  {
    center: [106.83, -6.18],
    zoom: 8,
  },
  {
    center: [106.826, -6.36],
    zoom: 12,
  },
];

const About = () => {
  const mapRef = useRef<any>(null);
  const wrapper = useRef<HTMLDivElement>(null);

  const updateScrollPosition = (e: any) => {
    if (wrapper.current && mapRef.current) {
      const { top } = wrapper.current.getBoundingClientRect();
      const { innerHeight } = window;
      const offset = innerHeight - 2.5 * top + 64;
      if (offset < 0 || offset > innerHeight) return;
      const zoom = Math.min(offset / innerHeight, 1) * 9 + 5;
      mapRef.current.setZoom(zoom);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);

  return (
    <div className={s.wrapper} ref={wrapper}>
      <Map
        ref={mapRef}
        mapLib={import("mapbox-gl")}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={TOKEN}
        onLoad={(event) => {
          mapRef.current = event.target;
        }}
        initialViewState={{
          latitude: ZOOM[2].center[1],
          longitude: ZOOM[2].center[0],
          zoom: 5,
        }}
      />
      <div className={s.mapOverlay}>
        <div className={s.mapOverlayContent}>
          <SectionTitle number="📋" title="About" />
          <p className={s.story}>
            Hey, I am a vibrant CS student 👨‍💻 and aspiring software engineer ✨
            based in Indonesia 🇮🇩. Driven by curiosity, a zest for life, and a
            passion for coding 🔥, I strive to conquer the ever-expanding tech
            industry and achieve great things in this rapidly evolving landscape
            🚀.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
