interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  description: string;
}

export const ProgressBar = ({ 
  current, 
  max, 
  label, 
  description 
}: ProgressBarProps): JSX.Element => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{label}</h3>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
        <div 
          className="bg-gray-800 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
