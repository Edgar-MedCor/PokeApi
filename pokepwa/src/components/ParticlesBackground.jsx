import React from "react";
import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <div className="absolute inset-0 -z-10">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: { enable: false },
          detectRetina: true,
          fpsLimit: 60,
          particles: {
            number: { value: 60, density: { enable: true, area: 800 } },
            color: { value: ["#fff7c2", "#ffd1e3", "#c7b3ff"] },
            move: { enable: true, speed: 0.6, outModes: { default: "bounce" } },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.6, anim: { enable: true, speed: 1, minimumValue: 0.2 } },
            links: { enable: true, distance: 130, color: "#ffffff", opacity: 0.08, width: 1 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.15 } },
              repulse: { distance: 120, speed: 0.8 },
            },
          },
          background: {
            color: "transparent",
          },
        }}
        className="w-full h-full"
      />
    </div>
  );
}
