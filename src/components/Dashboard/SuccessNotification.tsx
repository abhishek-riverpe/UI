import { CheckCircle } from "lucide-react";

interface SuccessNotificationProps {
  title: string;
  message: string;
  isVisible: boolean;
}

export const SuccessNotification = ({ 
  title, 
  message, 
  isVisible 
}: SuccessNotificationProps): JSX.Element => {
  if (!isVisible) return null;

  return (
    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
      <div>
        <div className="font-semibold text-green-800">{title}</div>
        <div className="text-green-700 text-sm">{message}</div>
      </div>
    </div>
  );
};
