import { useState, useCallback, useMemo, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useAuthStore } from "@/stores/useAuthStore";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [particlesReady, setParticlesReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  const particlesOptions = useMemo(
    () => ({
      fullScreen: false,
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        color: { value: "#7c3aed" },
        links: {
          color: "#7c3aed",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1.5,
          direction: "none" as const,
          outModes: { default: "bounce" as const },
        },
        number: {
          density: { enable: true },
          value: 60,
        },
        opacity: { value: 0.4 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "grab" },
        },
        modes: {
          grab: { distance: 140, links: { opacity: 0.6 } },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    await login(username, password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {particlesReady && <Particles id="tsparticles" className="absolute inset-0" particlesLoaded={particlesLoaded} options={particlesOptions} />}

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Selamat Datang Kembali</h1>

        {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">{error}</div>}

        <form onSubmit={handleSubmit}>
          <InputField id="username" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan username" />
          <InputField id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" />
          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Login
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">Demo: emilys / emilyspass</p>
      </div>
    </div>
  );
}
