import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#f0f9ff"
          }
        },
        fullScreen: { enable: false },
        particles: {
          number: {
            value: 50,
            density: { enable: true, area: 800 }
          },
          color: { value: "#3b82f6" },
          shape: { type: "circle" },
          opacity: { value: 0.3 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            outModes: { default: "out" }
          }
        },
      }}
      className="absolute inset-0 z-0"
    />
  );
}
