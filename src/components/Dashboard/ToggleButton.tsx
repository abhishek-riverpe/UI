interface ToggleButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export const ToggleButton = ({ isActive, onClick }: ToggleButtonProps) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "32px",
        height: "18px",
        backgroundColor: isActive ? "#030213" : "#CBCED4",
        borderRadius: "20px",
        padding: isActive ? "0px 0px 0px 14px" : "0px 14px 0px 0px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease-in-out"
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          backgroundColor: "#FFFFFF",
          borderRadius: "50%",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
        }}
      />
    </div>
  );
};
