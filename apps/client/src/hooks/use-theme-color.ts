import { useEffect } from "react";

import { useTheme } from "next-themes";

export function useThemeColor() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Get the theme color meta tag
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content",
        resolvedTheme === "dark" ? "#000000" : "#000000"
      );
    }
  }, [resolvedTheme]);
}
