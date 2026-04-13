import { useEffect, useRef } from "react";

/**
 * useSEO — Sets document.title, meta description, and injects JSON-LD structured data.
 * Cleans up JSON-LD on unmount to prevent stale schema from persisting across SPA views.
 *
 * Hook signature: useRef → useRef → useEffect  (stable across renders)
 */
export function useSEO({
  title,
  description,
  jsonLd,
}: {
  title: string;
  description?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const jsonLdRef = useRef<string>("");

  // Stringify once; only recompute when title changes (proxy for page change)
  if (jsonLd) {
    const next = JSON.stringify(jsonLd);
    if (jsonLdRef.current !== next) jsonLdRef.current = next;
  } else {
    jsonLdRef.current = "";
  }

  useEffect(() => {
    // Set document title
    document.title = title;

    // Set or update meta description
    if (description) {
      let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    // Clean up previous JSON-LD
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Inject JSON-LD structured data
    const jsonStr = jsonLdRef.current;
    if (jsonStr) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = jsonStr;
      document.head.appendChild(script);
      scriptRef.current = script;
    }

    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description]);
}
