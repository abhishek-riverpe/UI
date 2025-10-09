import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  flag: string;
}

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
}

const currencies: Currency[] = [
  { code: "USD", name: "US Dollars", flag: "🇺🇸" },
  { code: "EUR", name: "Euros", flag: "🇪🇺" },
  { code: "GBP", name: "British Pounds", flag: "🇬🇧" },
];

export const CurrencySelector = ({ 
  selectedCurrency, 
  onCurrencyChange 
}: CurrencySelectorProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        You add in this currency
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-4 border border-gray-300 rounded-lg bg-white flex items-center justify-between hover:border-gray-400 transition-colors"
        >
          <div className="flex items-center">
            <span className="text-lg mr-3">{selectedCurrency.flag}</span>
            <div className="text-left">
              <div className="font-semibold">{selectedCurrency.code}</div>
              <div className="text-sm text-gray-600">{selectedCurrency.name}</div>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                onClick={() => {
                  onCurrencyChange(currency);
                  setIsOpen(false);
                }}
                className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg mr-3">{currency.flag}</span>
                <div className="text-left">
                  <div className="font-semibold">{currency.code}</div>
                  <div className="text-sm text-gray-600">{currency.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
