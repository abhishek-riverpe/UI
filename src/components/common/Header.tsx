import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "../ui/Profile";
import { useAppContext } from "../../context/AppContext";

type HeaderProps = {
  userName?: string;
  userImageSrc?: string;
  onProfileClick?: () => void;
};

const Header = ({
  userName,
  userImageSrc = "/Profile.svg",
  onProfileClick,
}: HeaderProps): JSX.Element => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAppContext();
  const [open, setOpen] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const displayName = userName || user?.firstName || user?.username || "User";

  const handleProfileClick = () => {
    setOpen((v) => !v);
    onProfileClick?.();
  };

  const handleLogout = () => {
    clearAuth();
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  return (
    <header className="relative flex items-center justify-between w-full px-36 py-6">
      {/* Logo */}
      <button 
        onClick={() => navigate("/")} 
        aria-label="Go to dashboard" 
        className="w-fit"
      >
        <img className="h-6 w-auto" alt="Riverpe" src="/Logo.png" />
      </button>

      {/* Profile */}
      <div ref={menuRef} className="relative">
        <Profile
          name={displayName}
          imageSrc={userImageSrc}
          onClick={handleProfileClick}
        />

        {open && (
          <div className="absolute right-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-lg p-3 z-50">
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.firstName || user?.lastName ? `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() : displayName}
              </p>
              {user?.username && showEmail && (
                <p className="text-xs text-gray-500 truncate">{user.username}</p>
              )}
              {user?.username && (
                <button
                  type="button"
                  onClick={() => setShowEmail((v) => !v)}
                  className="mt-1 text-xs text-blue-600 hover:underline"
                >
                  {showEmail ? "Hide email" : "Show email"}
                </button>
              )}
            </div>
            <div className="h-px bg-gray-200 my-2" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
