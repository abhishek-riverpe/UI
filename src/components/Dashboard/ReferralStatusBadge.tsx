interface ReferralStatusBadgeProps {
  status: "rewarded" | "qualified" | "verified" | "signed_up" | "invited";
}

export const ReferralStatusBadge = ({ status }: ReferralStatusBadgeProps): JSX.Element => {
  const getBadgeConfig = () => {
    switch (status) {
      case "rewarded":
        return {
          text: "✓ Rewarded",
          className: "bg-green-100 text-green-800"
        };
      case "qualified":
        return {
          text: "Qualified",
          className: "bg-green-100 text-green-800"
        };
      case "verified":
        return {
          text: "Verified",
          className: "bg-blue-100 text-blue-800"
        };
      case "signed_up":
        return {
          text: "Signed up",
          className: "bg-purple-100 text-purple-800"
        };
      case "invited":
        return {
          text: "Invited",
          className: "bg-gray-100 text-gray-800"
        };
      default:
        return {
          text: "Unknown",
          className: "bg-gray-100 text-gray-800"
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.text}
    </span>
  );
};
