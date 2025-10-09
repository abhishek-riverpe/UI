import { ChevronDown, Filter, X } from "lucide-react";

interface FilterOption {
  label: string;
  value: string;
  active?: boolean;
}

interface FilterGroupProps {
  filters: FilterOption[];
  onFilterChange: (value: string) => void;
  onClearAll: () => void;
  timeFilter: string;
  onTimeFilterChange: (value: string) => void;
}

export const FilterGroup = ({ 
  filters, 
  onFilterChange, 
  onClearAll,
  timeFilter,
  onTimeFilterChange
}: FilterGroupProps): JSX.Element => {
  return (
    <div className="flex items-center gap-3 mb-6">
      {/* Filter Buttons */}
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter.active
              ? 'bg-black text-white'
              : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
          }`}
        >
          {filter.label}
        </button>
      ))}
      
      {/* Time Filter Dropdown */}
      <div className="relative">
        <button className="px-4 py-2 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center gap-2">
          <span>{timeFilter}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      
      {/* Clear All */}
      <button
        onClick={onClearAll}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <X className="w-4 h-4" />
        <span>Clear All</span>
      </button>
    </div>
  );
};
