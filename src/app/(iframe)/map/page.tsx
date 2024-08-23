"use client";
import Map from "react-map-gl";
import s from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";

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

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const MAP_STYLE = "mapbox://styles/wutsqo/clecpt0sg000001rzc396f1ku";

export default function Page() {
  const mapRef = useRef<any>(null);
  const [zoomIndex, setZoomIndex] = useState(2);

  const zoomOut = () => {
    setZoomIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const zoomIn = () => {
    setZoomIndex((prev) => (prev === ZOOM.length - 1 ? prev : prev + 1));
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo(ZOOM[zoomIndex], {
        duration: 1000,
      });
    }
  }, [zoomIndex]);

  return (
    <div className={s.map}>
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
          zoom: ZOOM[2].zoom,
        }}
      />
      <div className={s.mapOverlay}>
        <button
          className={s.zoom}
          onClick={zoomIn}
          disabled={zoomIndex === ZOOM.length - 1}
        >
          <MagnifyingGlassPlusIcon className={s.zoomIcon} />
        </button>
        <button className={s.zoom} onClick={zoomOut} disabled={zoomIndex === 0}>
          <MagnifyingGlassMinusIcon className={s.zoomIcon} />
        </button>
      </div>
    </div>
  );
}
