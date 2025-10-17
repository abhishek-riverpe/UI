import { useNavigate } from "react-router-dom";
import Profile from "../ui/Profile";

type HeaderProps = {
  userName?: string;
  userImageSrc?: string;
  onProfileClick?: () => void;
};

const Header = ({ 
  userName = "Jane Doe", 
  userImageSrc = "/Profile.svg",
  onProfileClick 
}: HeaderProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between w-full px-36 py-6">
      {/* Logo */}
      <button 
        onClick={() => navigate("/")} 
        aria-label="Go to dashboard" 
        className="w-fit"
      >
        <img className="h-6 w-auto" alt="Riverpe" src="/Logo.png" />
      </button>

      {/* Profile */}
      <Profile 
        name={userName} 
        imageSrc={userImageSrc} 
        onClick={onProfileClick} 
      />
    </header>
  );
};

export default Header;

