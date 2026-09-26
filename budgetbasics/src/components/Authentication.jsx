/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  User,
  LogIn,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Calendar,
  GraduationCap,
  Info,
} from "lucide-react";
import initialUsersData from "../data/users.json";
import "./Authentication.css";

// Storage keys
const USERS_STORAGE_KEY = "budget_users";
const ACTIVE_USER_STORAGE_KEY = "budget_active_user";

// Seed & retrieve registered users from LocalStorage
const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn("Error reading users from localStorage:", err);
  }
  // Initialize with the 2 pre-registered users from users.json
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsersData));
  } catch {
    // Ignore storage quota errors in private browsing
  }
  return initialUsersData;
};

// Retrieve active logged-in user from LocalStorage
const getActiveUser = () => {
  try {
    const raw = localStorage.getItem(ACTIVE_USER_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading active session from localStorage:", err);
  }
  return null;
};

// Global Event Buses for cross-component and cross-tab reactivity
const authListeners = new Set();
const notifyAuthChange = (newUser) => {
  authListeners.forEach((listener) => listener(newUser));
};

// Global Modal State Bus so any button (desktop, mobile drawer, etc.) can open the modal reliably
let globalModalState = { isOpen: false, tab: "login" };
const modalListeners = new Set();

export const openAuthModal = (tab = "login") => {
  globalModalState = { isOpen: true, tab };
  modalListeners.forEach((listener) => listener(globalModalState));
};

export const closeAuthModal = () => {
  globalModalState = { isOpen: false, tab: "login" };
  modalListeners.forEach((listener) => listener(globalModalState));
};

/**
 * Custom React hook for consuming authentication state and actions
 */
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(() => getActiveUser());

  useEffect(() => {
    const handleAuthChange = (user) => {
      setCurrentUser(user);
    };

    authListeners.add(handleAuthChange);

    // Cross-tab synchronization via native storage event
    const handleStorageEvent = (event) => {
      if (event.key === ACTIVE_USER_STORAGE_KEY) {
        try {
          const user = event.newValue ? JSON.parse(event.newValue) : null;
          setCurrentUser(user);
        } catch {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      authListeners.delete(handleAuthChange);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const login = useCallback((identifier, password) => {
    const users = getStoredUsers();
    const cleanId = identifier.trim().toLowerCase();
    const matched = users.find(
      (u) =>
        (u.username?.toLowerCase() === cleanId ||
          u.email?.toLowerCase() === cleanId) &&
        u.password === password
    );

    if (!matched) {
      return { success: false, message: "Invalid username/email or password." };
    }

    try {
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(matched));
    } catch {
      // Ignore in strict private mode
    }

    notifyAuthChange(matched);
    return { success: true, user: matched };
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(ACTIVE_USER_STORAGE_KEY);
    } catch {
      // Ignore
    }
    notifyAuthChange(null);
  }, []);

  const register = useCallback((newUserData) => {
    const users = getStoredUsers();
    const cleanUsername = newUserData.username.trim().toLowerCase();
    const cleanEmail = newUserData.email.trim().toLowerCase();

    // Check if username or email is already taken
    const existing = users.find(
      (u) =>
        u.username?.toLowerCase() === cleanUsername ||
        u.email?.toLowerCase() === cleanEmail
    );

    if (existing) {
      return {
        success: false,
        message: "A user with this username or email already exists.",
      };
    }

    const createdUser = {
      id: `usr_${Date.now()}`,
      name: newUserData.name.trim(),
      username: newUserData.username.trim(),
      email: cleanEmail,
      password: newUserData.password,
      avatar:
        newUserData.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          newUserData.name
        )}&background=10b981&color=fff&bold=true`,
      role: newUserData.role || "Verified Student",
      joinedDate: new Date().toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      }),
      college: newUserData.college?.trim() || "BudgetBasics Learner",
      bio: "Learning smart student financial management.",
    };

    const updatedUsers = [...users, createdUser];
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      localStorage.setItem(ACTIVE_USER_STORAGE_KEY, JSON.stringify(createdUser));
    } catch {
      // Ignore
    }

    notifyAuthChange(createdUser);
    return { success: true, user: createdUser };
  }, []);

  return {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    login,
    logout,
    register,
    registeredUsers: getStoredUsers(),
  };
};

// Avatar presets available for registration
const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=240&h=240&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&h=240&q=80",
];

//  Authentication modal for login & registration
export const AuthModal = ({ isOpen, onClose, onLogin, onRegister, initialTab = "login" }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [regName, setRegName] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regAvatar, setRegAvatar] = useState(AVATAR_PRESETS[0]);
  const [regCollege, setRegCollege] = useState("");

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset messages when switching tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Quick 1-click demo login
  const handleQuickDemoLogin = (user) => {
    setLoginIdentifier(user.username);
    setLoginPassword(user.password);
    setErrorMessage("");
    const res = onLogin(user.username, user.password);
    if (res.success) {
      setSuccessMessage(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        onClose();
      }, 600);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!loginIdentifier.trim() || !loginPassword) {
      setErrorMessage("Please enter both username/email and password.");
      return;
    }

    const res = onLogin(loginIdentifier, loginPassword);
    if (res.success) {
      setSuccessMessage(`Welcome back, ${res.user.name}!`);
      setTimeout(() => {
        onClose();
      }, 600);
    } else {
      setErrorMessage(res.message);
    }
  };

    // Full name input handling
    // Rule: User cannot enter any number or special character.
    // Only letters (A-Z, a-z) and spaces are allowed.
  const handleNameKeyDown = (e) => {
    // Allow navigation, deletion, clipboard shortcuts
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }
    // Block any non-letter and non-space characters
    if (!/^[a-zA-Z\s]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleNameChange = (e) => {
    // Strip out all numbers and special characters immediately
    const cleanValue = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setRegName(cleanValue);
  };

  
    // Username input handling
    // Rule:
    // 1. Cannot start with any number or special character (must start with a letter).
    // 2. Only letters, numbers, and (- _ & .) special characters are allowed.
  const handleUsernameKeyDown = (e) => {
    // Allow navigation, deletion, clipboard shortcuts
    if (
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "Tab" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.ctrlKey ||
      e.metaKey
    ) {
      return;
    }

    const input = e.target;
    const isAtStart = input.selectionStart === 0;

    if (isAtStart) {
      // First character must be a letter only (no numbers, no special characters)
      if (!/^[a-zA-Z]$/.test(e.key)) {
        e.preventDefault();
        return;
      }
    }

    // Subsequent characters: only letters, numbers, and (- _ & .)
    if (!/^[a-zA-Z0-9\-_&.]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleUsernameChange = (e) => {
    let val = e.target.value;
    // Strip out any characters not in [a-zA-Z0-9\-_&.]
    val = val.replace(/[^a-zA-Z0-9\-_&.]/g, "");
    // If first character is not a letter, strip leading non-letters
    if (val.length > 0 && !/^[a-zA-Z]/.test(val)) {
      val = val.replace(/^[^a-zA-Z]+/, "");
    }
    setRegUsername(val);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmedName = regName.trim();
    const trimmedUsername = regUsername.trim();

    if (!trimmedName || !trimmedUsername || !regEmail.trim() || !regPassword) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    // Validate Full Name
    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      setErrorMessage("Full Name can only contain alphabetic letters and spaces.");
      return;
    }
    if (trimmedName.length < 2) {
      setErrorMessage("Full Name must be at least 2 characters.");
      return;
    }

    // Validate Username
    if (!/^[a-zA-Z]/.test(trimmedUsername)) {
      setErrorMessage("Username cannot start with a number or special character.");
      return;
    }
    if (!/^[a-zA-Z][a-zA-Z0-9\-_&.]*$/.test(trimmedUsername)) {
      setErrorMessage(
        "Username can only contain letters, numbers, and these special characters: - _ & ."
      );
      return;
    }
    if (trimmedUsername.length < 3) {
      setErrorMessage("Username must be at least 3 characters long.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const res = onRegister({
      name: trimmedName,
      username: trimmedUsername,
      email: regEmail,
      password: regPassword,
      avatar: regAvatar,
      college: regCollege,
    });

    if (res.success) {
      setSuccessMessage(`Account created successfully! Welcome, ${res.user.name}!`);
      setTimeout(() => {
        onClose();
      }, 650);
    } else {
      setErrorMessage(res.message);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="auth-modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="auth-modal-card">
        {/* Modal header */}
        <div className="p-3 px-4 border-bottom d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-2">
            <div
              className="p-1.5 rounded-2 d-flex align-items-center justify-content-center text-white"
              style={{ backgroundColor: "#10b981", width: "32px", height: "32px" }}
            >
              <LogIn />
            </div>
            <div>
              <h2 className="fs-6 fw-bold mb-0 text-body" id="auth-modal-title">
                {activeTab === "login" ? "Sign In to BudgetBasics" : "Create New Account"}
              </h2>
              <small className="text-muted" style={{ fontSize: "0.78rem" }}>
                Local Auth System
              </small>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary rounded-circle p-1 d-flex align-items-center justify-content-center"
            onClick={onClose}
            aria-label="Close dialog"
            style={{ width: "30px", height: "30px" }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal body */}
        <div className="auth-modal-body">
          {/* Tab navigation */}
          <div className="auth-nav-tabs mb-3" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "login"}
              className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabSwitch("login")}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "register"}
              className={`auth-tab-btn ${activeTab === "register" ? "active" : ""}`}
              onClick={() => handleTabSwitch("register")}
            >
              Register
            </button>
          </div>

          {/* Feedback messages */}
          {errorMessage && (
            <div className="alert alert-danger py-2 px-3 small d-flex align-items-center gap-2 mb-3 rounded-3">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success py-2 px-3 small d-flex align-items-center gap-2 mb-3 rounded-3">
              <CheckCircle2 size={16} className="flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login form */}
          {activeTab === "login" && (
            <div>
              {/* Quick demo logins banner */}
              <div className="mb-3">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <span className="small fw-semibold text-muted" style={{ fontSize: "0.76rem" }}>
                    Try Demo Accounts (1-CLICK)
                  </span>
                  <span className="badge bg-success-subtle text-success small">Ready</span>
                </div>
                <div className="vstack gap-2">
                  {initialUsersData.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemoLogin(u)}
                      className="demo-user-badge w-100 d-flex align-items-center justify-content-between text-start"
                      title={`Quick log in as ${u.name}`}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          width="32"
                          height="32"
                          className="rounded-circle object-fit-cover border"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              u.name
                            )}&background=10b981&color=fff&bold=true`;
                          }}
                        />
                        <div>
                          <div className="fw-semibold text-body small">{u.name}</div>
                          <div className="text-muted" style={{ fontSize: "0.74rem" }}>
                            {u.username} • {u.password}
                          </div>
                        </div>
                      </div>
                      <span className="btn btn-xs btn-success rounded-pill px-2 py-0.5 small" style={{ fontSize: "0.72rem" }}>
                        Click to Login
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="position-relative text-center my-3">
                <hr className="my-0 text-muted" />
                <span className="position-absolute top-50 start-50 translate-middle px-2 bg-body small text-muted">
                  or sign in manually
                </span>
              </div>

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-body mb-1">
                    Username or Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-body-tertiary border-end-0">
                      <User size={16} className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="e.g. alexmorgan or alex.morgan@budgetbasics.org"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-semibold text-body mb-1">
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-body-tertiary border-end-0">
                      <Lock size={16} className="text-muted" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control border-start-0 border-end-0"
                      placeholder="Enter password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="input-group-text bg-body-tertiary"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-emerald w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 mt-3"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </button>
              </form>
            </div>
          )}

          {/* Registration form */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-2.5">
                <label className="form-label small fw-semibold text-body mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="e.g. Jordan Smith (Letters and spaces only)"
                  value={regName}
                  onKeyDown={handleNameKeyDown}
                  onChange={handleNameChange}
                  required
                />
                <div className="auth-field-hint">
                  <Info size={12} className="me-1 d-inline text-muted" />
                  No numbers or special characters allowed.
                </div>
              </div>

              <div className="row g-2 mb-2.5">
                <div className="col-12 col-sm-6">
                  <label className="form-label small fw-semibold text-body mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. jsmith_01"
                    value={regUsername}
                    onKeyDown={handleUsernameKeyDown}
                    onChange={handleUsernameChange}
                    required
                  />
                  <div className="auth-field-hint">
                    <Info size={12} className="me-1 d-inline text-muted" />
                    Must start with a letter. Special chars allowed: <strong>- _ &amp; .</strong>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label small fw-semibold text-body mb-1">
                    College / Major
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="e.g. Economics Major"
                    value={regCollege}
                    onChange={(e) => setRegCollege(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-2.5">
                <label className="form-label small fw-semibold text-body mb-1">
                  Email Address *
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-body-tertiary border-end-0">
                    <Mail size={14} className="text-muted" />
                  </span>
                  <input
                    type="email"
                    className="form-control border-start-0"
                    placeholder="e.g. jordan@university.edu"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small fw-semibold text-body mb-1">
                  Password (min 6 characters) *
                </label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-body-tertiary border-end-0">
                    <Lock size={14} className="text-muted" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0 border-end-0"
                    placeholder="Create secure password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <button
                    type="button"
                    className="input-group-text bg-body-tertiary"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {/* Avatar preset selector */}
              <div className="mb-3">
                <label className="form-label small fw-semibold text-body mb-1.5 d-block">
                  Choose Profile Avatar
                </label>
                <div className="d-flex align-items-center gap-2">
                  {AVATAR_PRESETS.map((presetUrl, idx) => (
                    <img
                      key={presetUrl}
                      src={presetUrl}
                      alt={`Avatar option ${idx + 1}`}
                      className={`avatar-preset-option ${
                        regAvatar === presetUrl ? "selected" : ""
                      }`}
                      onClick={() => setRegAvatar(presetUrl)}
                      loading="lazy"
                      decoding="async"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-emerald w-100 py-2 rounded-3 d-flex align-items-center justify-content-center gap-2 mt-3"
              >
                <ShieldCheck size={16} />
                <span>Create Free Account</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

  // Main Authentication Component
  // Supports two rendering variants:
  // 1. variant="desktop": rendered on the top navbar (desktop/tablet screens)
  // 2. variant="mobile": rendered inside the mobile drawer dropdown
  
const Authentication = ({ variant = "desktop", onMobileClose }) => {
  const { currentUser, isAuthenticated, login, logout, register } = useAuth();
  const [modalState, setModalState] = useState(() => globalModalState);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // Subscribe to global modal open/close events
  useEffect(() => {
    const handleModalChange = (state) => {
      setModalState(state);
    };

    modalListeners.add(handleModalChange);
    return () => {
      modalListeners.delete(handleModalChange);
    };
  }, []);

  // Close profile dropdown on outside click or escape key
  useEffect(() => {
    if (!isProfileOpen) return;

    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsProfileOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isProfileOpen]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    if (onMobileClose) onMobileClose();
  };

  const handleOpenAuth = (tab = "login") => {
    setIsProfileOpen(false);
    // If inside mobile drawer, close the drawer safely
    if (onMobileClose) {
      onMobileClose();
    }
    // Open the modal via global state
    openAuthModal(tab);
  };

  // --- Mobile drawer dropdown variant ---
  if (variant === "mobile") {
    return (
      <div className="w-100 mt-2">
        {isAuthenticated && currentUser ? (
          <div className="mobile-auth-user-card">
            {/* User Profile Header with generous x-axis padding */}
            <div className="d-flex align-items-center gap-2.5 pb-2.5 mb-2.5 border-bottom border-success-subtle">
              <div className="position-relative flex-shrink-0">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width="46"
                  height="46"
                  className="rounded-circle object-fit-cover border border-2 border-success shadow-2xs"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      currentUser.name
                    )}&background=10b981&color=fff&bold=true`;
                  }}
                />
                <span className="auth-online-status-dot" aria-hidden="true" />
              </div>

              {/* User details with proper x-axis padding and truncation */}
              <div className="mobile-user-details-col overflow-hidden">
                <div className="mobile-user-name text-truncate mb-0.5">
                  {currentUser.name}
                </div>
                <div className="mobile-user-username text-truncate mb-1">
                  @{currentUser.username}
                </div>
                <div className="mobile-user-email text-truncate d-flex align-items-center gap-1">
                  <Mail size={12} className="flex-shrink-0 text-muted" />
                  <span className="text-truncate">{currentUser.email}</span>
                </div>
              </div>
            </div>

            {/* Bottom actions row */}
            <div className="d-flex align-items-center justify-content-between pt-1 px-1">
              <span className="badge bg-success-subtle text-success small py-1 px-2.5 rounded-pill fw-medium">
                {currentUser.role || "Verified Student"}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1.5 py-1 px-3 rounded-2 fw-semibold"
                style={{ fontSize: "0.82rem" }}
              >
                <LogOut size={13} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => handleOpenAuth("login")}
            className="btn btn-emerald text-start w-100 d-flex align-items-center justify-content-between py-2 px-3 rounded-3 shadow-2xs"
          >
            <div className="d-flex align-items-center gap-2">
              <User size={16} />
              <span className="fw-semibold">Sign In / Register</span>
            </div>
            <span className="badge bg-white text-success rounded-pill px-2 py-0.5 small" style={{ fontSize: "0.72rem" }}>
              LocalStorage
            </span>
          </button>
        )}
      </div>
    );
  }

  // --- Desktop navbar variant ---
  // The desktop variant stays permanently mounted in the main navbar layout,
  // making it the perfect persistent host for the AuthModal portal!
  return (
    <div className="position-relative d-inline-block" ref={profileRef}>
      {isAuthenticated && currentUser ? (
        // When logged in: Changed to icon button showing user picture / avatar
        <>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="auth-avatar-btn"
            aria-label={`User account for ${currentUser.name}`}
            aria-expanded={isProfileOpen}
            aria-haspopup="true"
            title={`${currentUser.name} (${currentUser.email}) - Click to view account`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="auth-avatar-img"
              width="38"
              height="38"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  currentUser.name
                )}&background=10b981&color=fff&bold=true`;
              }}
            />
            <span className="auth-online-status-dot" aria-hidden="true" />
          </button>

          {/* Account / User info popup card */}
          {isProfileOpen && (
            <div className="auth-profile-popover" role="dialog" aria-label="User Account Information">
              {/* Popover Header with proper x-axis padding */}
              <div className="auth-popover-header">
                <div className="d-flex align-items-center gap-2.5">
                  <div className="position-relative flex-shrink-0">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      width="52"
                      height="52"
                      className="rounded-circle object-fit-cover border border-2 border-success shadow-sm"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          currentUser.name
                        )}&background=10b981&color=fff&bold=true`;
                      }}
                    />
                    <span className="auth-online-status-dot" aria-hidden="true" />
                  </div>
                  <div className="auth-popover-user-text overflow-hidden">
                    <h3 className="fs-6 fw-bold text-body mb-0.5 text-truncate">
                      {currentUser.name}
                    </h3>
                    <div className="text-success small fw-semibold mb-1 text-truncate">
                      @{currentUser.username}
                    </div>
                    <span className="badge bg-success-subtle text-success small py-0.5 px-2 rounded-pill">
                      {currentUser.role || "Verified Student"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Popover Body Details */}
              <div className="auth-popover-body vstack gap-2.5 small">
                <div className="d-flex align-items-center gap-2 text-muted">
                  <Mail size={15} className="text-secondary flex-shrink-0" />
                  <span className="text-body text-truncate">{currentUser.email}</span>
                </div>

                {currentUser.college && (
                  <div className="d-flex align-items-center gap-2 text-muted">
                    <GraduationCap size={15} className="text-secondary flex-shrink-0" />
                    <span className="text-body text-truncate">{currentUser.college}</span>
                  </div>
                )}

                <div className="d-flex align-items-center gap-2 text-muted">
                  <Calendar size={15} className="text-secondary flex-shrink-0" />
                  <span className="text-body">
                    Member since {currentUser.joinedDate || "2026"}
                  </span>
                </div>

                <div className="p-2 rounded-2 bg-body-tertiary border mt-1">
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted" style={{ fontSize: "0.74rem" }}>
                      Session Persistence:
                    </span>
                    <span className="badge bg-success-subtle text-success" style={{ fontSize: "0.72rem" }}>
                      LocalStorage Active
                    </span>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 mt-2 py-1.5 rounded-3"
                >
                  <LogOut size={15} />
                  <span className="fw-semibold">Log Out</span>
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        // When not logged in: Clean Sign In button
        <button
          type="button"
          onClick={() => handleOpenAuth("login")}
          className="btn btn-sm btn-outline-success d-flex align-items-center gap-1 rounded-3 px-2 py-1 px-sm-3 shadow-2xs"
          title="Sign in or register an account"
          style={{
            borderColor: "rgba(16, 185, 129, 0.45)",
            color: "#10b981",
          }}
        >
          <User size={15} />
          <span className="fw-semibold">Sign In</span>
        </button>
      )}

      {/* Persistent AuthModal: controlled via global modalState, rendered directly to document.body */}
      <AuthModal
        key={`${modalState.isOpen}-${modalState.tab}`}
        isOpen={modalState.isOpen}
        initialTab={modalState.tab}
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
    </div>
  );
};

export default Authentication;
