import { useState } from "react";

const PASS_KEY = "loocus-phakic-auth";
const VALID_PASSWORD = "loocus2026";

export function isAuthenticated() {
  return sessionStorage.getItem(PASS_KEY) === "1";
}

export function logout() {
  sessionStorage.removeItem(PASS_KEY);
}

export function LoginPage({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (password === VALID_PASSWORD) {
      sessionStorage.setItem(PASS_KEY, "1");
      onSuccess();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    }
  }

  return (
    <div className="login-screen">
      <div className={`login-card${shaking ? " shake" : ""}`}>
        <div className="login-brand">loocus-phakic</div>
        <p className="login-subtitle">Product Retrospective · 내부 공유용</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            className={`login-input${error ? " login-error" : ""}`}
            placeholder="액세스 코드를 입력하세요"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            autoFocus
          />
          <button type="submit" className="login-btn">
            진입 →
          </button>
        </form>

        {error && <p className="login-error-msg">액세스 코드가 올바르지 않습니다.</p>}

        <p className="login-footer">비쥬웍스 DX팀 · 2026.04</p>
      </div>
    </div>
  );
}
