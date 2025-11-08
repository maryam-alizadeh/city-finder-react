import { useState, useEffect } from "react";
import cityList from "../components/cityList.json";

export function useCitySuggestion(value) {
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const trimmed = value.trim();
    if (!trimmed || trimmed[0] === trimmed[0].toLowerCase()) {
      setSuggestion("");
      return;
    }
    const timeout = setTimeout(() => {
      const match = cityList.find((c) =>
        c.toLowerCase().startsWith(trimmed.toLowerCase())
      );
      setSuggestion(match || "");
    }, 200);
    return () => clearTimeout(timeout);
  }, [value]);

  const completion =
    suggestion &&
    value &&
    suggestion.toLowerCase().startsWith(value.toLowerCase()) &&
    value[0] === value[0].toUpperCase()
      ? suggestion.slice(value.length)
      : "";

  return { suggestion, completion };
}
