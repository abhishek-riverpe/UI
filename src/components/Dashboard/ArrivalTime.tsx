import { Check } from "lucide-react";

interface ArrivalTimeProps {
  arrivalDate: string;
}

export const ArrivalTime = ({ arrivalDate }: ArrivalTimeProps): JSX.Element => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Should arrive by
      </label>
      
      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
        <Check className="w-4 h-4 mr-2" />
        <span className="font-medium">{arrivalDate}</span>
      </div>
    </div>
  );
};
