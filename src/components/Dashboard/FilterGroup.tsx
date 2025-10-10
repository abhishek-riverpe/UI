import { ChevronDown, Filter, FilterX, X } from "lucide-react";

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

const filterButtonSyles = {
  "received": "bg-[#1FCB92] text-white font-bold",
  "pending": "bg-[#FFFBEB] text-[#92400E] font-bold",
  "sent": "bg-black text-white font-bold",
  "all": "bg-white text-black border border-gray-300 hover:bg-gray-50 font-bold"
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
          className={`px-4 py-3 rounded-lg font-bold text-base transition-colors ${
            filter.active
              ? filterButtonSyles[filter.value as keyof typeof filterButtonSyles]
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
        <FilterX className="w-4 h-4" />
        <span>Clear All</span>
      </button>
    </div>
  );
};
