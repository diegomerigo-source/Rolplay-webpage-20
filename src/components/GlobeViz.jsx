'use client';
import { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const OFFICES = [
  { lat: 43.65,  lng: -79.38,  city: 'Toronto',          country: 'Canada' },
  { lat: 25.67,  lng: -100.31, city: 'Monterrey',        country: 'México' },
  { lat: 19.43,  lng: -99.13,  city: 'Ciudad de México', country: 'México' },
];

export default function GlobeViz() {
  const globeRef = useRef(null);

  useEffect(() => {
    if (!globeRef.current) return;

    // Set initial camera centred on the Americas
    globeRef.current.pointOfView({ lat: 30, lng: -90, altitude: 2.0 }, 0);

    // Enable auto-rotation
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
    }
  }, []);

  return (
    <Globe
      ref={globeRef}
      width={460}
      height={460}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
      backgroundColor="rgba(0,0,0,0)"
      atmosphereColor="#C0392B"
      atmosphereAltitude={0.15}
      pointsData={OFFICES}
      pointLat="lat"
      pointLng="lng"
      pointColor={() => '#C0392B'}
      pointAltitude={0.06}
      pointRadius={0.6}
      pointLabel={(d) => `<div style="background:rgba(10,10,14,0.85);border:1px solid rgba(192,57,43,0.6);border-radius:8px;padding:6px 10px;font-family:monospace;font-size:11px;color:#fff;letter-spacing:0.1em"><strong>${d.city}</strong><br/><span style="color:#999;font-size:9px;letter-spacing:0.2em;text-transform:uppercase">${d.country}</span></div>`}
      labelsData={OFFICES}
      labelLat="lat"
      labelLng="lng"
      labelText="city"
      labelColor={() => '#ffffff'}
      labelSize={1.2}
      labelDotRadius={0.4}
      labelAltitude={0.07}
    />
  );
}
