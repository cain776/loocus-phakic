import { logout } from "../pages/LoginPage";

export function ThemeToggle({ theme, onChange }) {
  function handleLogout() {
    logout();
    window.location.replace("/");
  }

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
      <span className="theme-toggle-divider" />
      <button
        type="button"
        className="logout-btn"
        onClick={handleLogout}
        title="로그아웃"
      >
        ⎋
      </button>
    </div>
  );
}
