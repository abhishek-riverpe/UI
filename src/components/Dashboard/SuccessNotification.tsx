import { Check } from "lucide-react";

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
    <div className="mb-6 px-4 py-6 bg-[#F8F8F8] border border-[#ACACAC] rounded-2xl flex items-center gap-5">
      <div className="w-12 h-12 rounded-full bg-[#CCF3E6] flex items-center justify-center flex-shrink-0">
        <Check className="w-6 h-6 text-[#137C59]" strokeWidth={3} />
      </div>
      <div>
        <div className="font-semibold text-[#222222] text-xl" style={{ fontFamily: 'Archivo, sans-serif', lineHeight: '1.05em' }}>
          {title}
        </div>
        <div className="text-[#222222] text-sm" style={{ fontFamily: 'Archivo, sans-serif', lineHeight: '1.5em' }}>
          {message}
        </div>
      </div>
    </div>
  );
};
