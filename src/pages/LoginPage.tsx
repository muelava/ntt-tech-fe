import { useState, useCallback, useMemo, useEffect, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { goeyToast } from "goey-toast";
import { useAuthStore } from "@/stores/useAuthStore";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);
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
    setHasError(false);
    await login(username, password);
    const state = useAuthStore.getState();
    if (state.isAuthenticated) {
      navigate("/");
    } else if (state.error) {
      setHasError(true);
      goeyToast.error("Login Gagal", { description: state.error });
    }
  };

  const handleChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
    if (hasError) setHasError(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {particlesReady && <Particles id="tsparticles" className="absolute inset-0" particlesLoaded={particlesLoaded} options={particlesOptions} />}

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Selamat Datang Kembali</h1>

        <form onSubmit={handleSubmit}>
          <InputField id="username" label="Username" value={username} onChange={handleChange(setUsername)} placeholder="Masukkan username" autoFocus error={hasError ? " " : undefined} />
          <InputField id="password" label="Password" type="password" value={password} onChange={handleChange(setPassword)} placeholder="Masukkan password" error={hasError ? " " : undefined} />
          <Button type="submit" isLoading={isLoading} className="w-full mt-2">
            Login
          </Button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">Demo: emilys / emilyspass</p>
      </div>
    </div>
  );
}
