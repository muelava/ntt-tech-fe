import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Cari..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, onSearch]);

  return (
    <div className="w-full max-w-sm">
      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
