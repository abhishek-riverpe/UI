interface EmptyStateProps {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps): JSX.Element => {
  return (
    <div className="text-center py-12">
      {/* Mobile Phone Illustration */}
      <div className="relative mb-8 mx-auto w-64 h-96">
        {/* Phone Frame */}
        <div className="absolute inset-0 bg-gray-800 rounded-3xl p-2">
          <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900 mb-2">PAYMENTS</div>
            <div className="text-3xl font-bold text-blue-600">$200</div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">$</span>
        </div>
        <div className="absolute top-8 -left-6 w-6 h-6 bg-gray-400 rounded-full"></div>
        <div className="absolute bottom-8 -right-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">✓</span>
        </div>
        <div className="absolute bottom-16 -left-4 w-4 h-4 bg-yellow-400 rounded-full"></div>
      </div>
      
      {/* Text Content */}
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-600 max-w-md mx-auto">{description}</p>
    </div>
  );
};
