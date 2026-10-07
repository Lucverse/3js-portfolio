import { useEffect, useState } from "react";
import type { PortfolioData } from "@/types/portfolio";

const SESSION_STORAGE_KEY = "portfolioData:v1";
const SESSION_CACHE_TTL_MS = 5 * 60 * 1000;

type SessionCachePayload = {
  timestamp: number;
  data: PortfolioData;
};

let inMemoryCache: PortfolioData | null = null;
let inFlightRequest: Promise<PortfolioData> | null = null;

function readFromSessionStorage(): PortfolioData | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SessionCachePayload;
    if (!parsed?.timestamp || !parsed?.data) return null;

    const isExpired = Date.now() - parsed.timestamp > SESSION_CACHE_TTL_MS;
    if (isExpired) {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

function writeToSessionStorage(data: PortfolioData) {
  if (typeof window === "undefined") return;

  try {
    const payload: SessionCachePayload = {
      timestamp: Date.now(),
      data,
    };
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore storage quota/privacy mode failures
  }
}

async function fetchPortfolioDataFromApi(): Promise<PortfolioData> {
  const response = await fetch("/api/portfolio", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch portfolio data: ${response.status}`);
  }

  return (await response.json()) as PortfolioData;
}

export async function getPortfolioDataClient(
  forceRefresh = false,
): Promise<PortfolioData> {
  if (!forceRefresh && inMemoryCache) {
    return inMemoryCache;
  }

  if (!forceRefresh) {
    const cached = readFromSessionStorage();
    if (cached) {
      inMemoryCache = cached;
      return cached;
    }
  }

  if (!forceRefresh && inFlightRequest) {
    return inFlightRequest;
  }

  inFlightRequest = fetchPortfolioDataFromApi()
    .then((data) => {
      inMemoryCache = data;
      writeToSessionStorage(data);
      return data;
    })
    .finally(() => {
      inFlightRequest = null;
    });

  return inFlightRequest;
}

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData | null>(() => inMemoryCache);
  const [isLoading, setIsLoading] = useState<boolean>(() => !inMemoryCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    getPortfolioDataClient()
      .then((portfolioData) => {
        if (!isMounted) return;
        setData(portfolioData);
      })
      .catch((err: unknown) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
}
