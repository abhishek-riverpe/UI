// components/Profile.tsx
type ProfileProps = {
  name: string;
  imageSrc: string;
  onClick?: () => void;
};

export default function Profile({ name, imageSrc, onClick }: ProfileProps) {
  const handleClick = () => {
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-gray-50 transition-colors"
    >
      <img
        src={imageSrc}
        alt={name}
        className="w-12 h-12 rounded-full object-cover"
      />
    </button>
  );
}
