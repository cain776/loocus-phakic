export function ThemeToggle({ theme, onChange }) {
  return (
    <div className="theme-toggle">
      <button
        type="button"
        className={theme === "dark" ? "active" : ""}
        onClick={() => onChange("dark")}
      >
        Dark
      </button>
      <button
        type="button"
        className={theme === "light" ? "active" : ""}
        onClick={() => onChange("light")}
      >
        Light
      </button>
    </div>
  );
}
