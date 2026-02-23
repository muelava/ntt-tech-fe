import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    await login(username, password);
    if (useAuthStore.getState().isAuthenticated) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

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
