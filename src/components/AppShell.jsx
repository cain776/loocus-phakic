import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TableOfContents } from "./TableOfContents";
import { ThemeToggle } from "./ThemeToggle";

const STORAGE_KEY = "report-refactor-theme";

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return window.localStorage.getItem(STORAGE_KEY) || "dark";
}

export function AppShell({ children, navigation, tocItems, brand }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <Sidebar navigation={navigation} brand={brand} />
      <ThemeToggle theme={theme} onChange={setTheme} />
      <div className="content-frame">{children}</div>
      <TableOfContents items={tocItems} />
    </div>
  );
}
