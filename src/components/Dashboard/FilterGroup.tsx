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
    <div className="mb-6 px-4 sm:px-0 overflow-x-scroll">
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Filter Buttons */}
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 sm:py-3 rounded-lg font-bold text-[10px] xs:text-xs sm:text-base transition-colors whitespace-nowrap flex-shrink-0 ${
              filter.active
                ? filterButtonSyles[filter.value as keyof typeof filterButtonSyles]
                : 'bg-white text-black border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
        
        {/* Time Filter Dropdown */}
        <div className="relative flex-shrink-0">
          <button className="px-1.5 xs:px-2 sm:px-4 py-1.5 xs:py-2 sm:py-2 rounded-lg bg-white text-black border border-gray-300 hover:bg-gray-50 flex items-center gap-1 sm:gap-2 text-[10px] xs:text-xs sm:text-base whitespace-nowrap">
            <span>{timeFilter}</span>
            <ChevronDown className="w-2.5 xs:w-3 sm:w-4 h-2.5 xs:h-3 sm:h-4" />
          </button>
        </div>
        
        {/* Clear All */}
        <button
          onClick={onClearAll}
          className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-800 transition-colors whitespace-nowrap flex-shrink-0"
        >
          <FilterX className="w-4 xs:w-3.5 sm:w-4 h-4 xs:h-3.5 sm:h-4" />
          <span className="hidden sm:inline text-base">Clear All</span>
        </button>
      </div>
    </div>
  );
};