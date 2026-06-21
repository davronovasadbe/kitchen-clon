import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaBolt, FaQrcode } from "react-icons/fa";
import kitchenImg from "../assets/kitchen.png";

function Login({ onLogin }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function formatPhone(value) {
    const digits = value.replace(/\D/g, "");
    let result = "+998 ";
    if (digits.length > 3) {
      result += digits.slice(0, 2) + " ";
      if (digits.length > 5) {
        result += digits.slice(2, 5) + " ";
        if (digits.length > 7) {
          result += digits.slice(5, 7) + " ";
          result += digits.slice(7, 9);
        } else {
          result += digits.slice(5);
        }
      } else {
        result += digits.slice(2);
      }
    } else {
      result += digits;
    }
    return result.trim();
  }

  function handlePhoneChange(e) {
    const raw = e.target.value;
    const filtered = raw.replace(/[^0-9+]/g, "");
    setPhone(formatPhone(filtered));
    setError("");
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setPassword(value);
    }
    setError("");
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const correctPhone = "+998 99 999 99 99";
    const correctPassword = "1010";

    if (phone !== correctPhone) {
      setError("Telefon raqam noto‘g‘ri");
      return;
    }

    if (password !== correctPassword) {
      setError("Parol noto‘g‘ri");
      return;
    }

    onLogin();
  }

  const displayPhone = phone.startsWith("+998") ? phone.slice(5) : phone;

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${kitchenImg})` }}
    >
      <div className="login-page-overlay" />

      <div className="brand-panel">
        <div className="brand-logo">
          <FaBolt />
        </div>
        <h1 className="brand-title">Kinetic Kitchen</h1>
        <p className="brand-sub">OPERATIONS MANAGEMENT SYSTEM</p>
        <p className="brand-tagline">
          High-velocity control for your culinary empire.
        </p>
        <div className="brand-trust">
          <span className="trust-avatars">
            <span className="avatar-dot dot-1" />
            <span className="avatar-dot dot-2" />
            <span className="avatar-dot dot-3" />
          </span>
          <span className="trust-text">
            Trusted by <strong>2,400+</strong> locations worldwide.
          </span>
        </div>
      </div>

      <div className="login-card">
        <div className="login-content">
          <div className="logo">Kk</div>
          <h1>Welcome back</h1>
          <p className="subhead">
            Access your kitchen dashboard and inventory.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="phone">PHONE NUMBER</label>
              <div className="input-wrap phone-input-wrap">
                <span className="phone-prefix">+998</span>
                <input
                  id="phone"
                  type="text"
                  inputMode="numeric"
                  placeholder="** ** *** ** **"
                  value={displayPhone}
                  onChange={handlePhoneChange}
                  className={
                    error && error.includes("Telefon") ? "input-error" : ""
                  }
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">PASSWORD</label>
              <div className="forgot-row">
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>
              <div className="input-wrap password-input-wrap">
                <FaLock className="lock-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  inputMode="numeric"
                  placeholder="****"
                  value={password}
                  onChange={handlePasswordChange}
                  maxLength={4}
                  className={
                    error && error.includes("Parol") ? "input-error" : ""
                  }
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={togglePasswordVisibility}
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Login <span className="arrow">→</span>
            </button>

            {error && <div className="message error">{error}</div>}
          </form>

          <a
            href="#"
            className="staff-link"
            onClick={(e) => e.preventDefault()}
          >
            <span className="qr-icon">
              <FaQrcode />
            </span>{" "}
            Login with Staff QR
          </a>
          <div className="footer">
            <div className="divider">
              <span className="line" />
              <span className="line" />
            </div>
            <b>Need assistance?</b>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Contact Support
            </a>
            <span className="sep">·</span>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
