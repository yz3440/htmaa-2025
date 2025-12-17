"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

interface SearchContextValue {
  search: string;
  setSearch: (value: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearchState] = useState(searchParams.get("search") ?? "");

  // Sync state from URL when URL changes externally (e.g., nav click)
  useEffect(() => {
    const searchFromUrl = searchParams.get("search") ?? "";
    setSearchState(searchFromUrl);
  }, [searchParams]);

  // Update URL when search changes
  const setSearch = useCallback(
    (value: string) => {
      setSearchState(value);

      // Only update URL if we're on the homepage
      if (pathname === "/") {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        const newUrl = params.toString() ? `/?${params.toString()}` : "/";
        router.replace(newUrl, { scroll: false });
      }
    },
    [pathname, router, searchParams],
  );

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}

