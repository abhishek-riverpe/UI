import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

interface CollapsibleFAQProps {
  title: string;
  items: FAQItem[];
}

export const CollapsibleFAQ = ({ title, items }: CollapsibleFAQProps): JSX.Element => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between py-3 text-left hover:bg-gray-50 rounded-lg px-2 -mx-2"
            >
              <span className="font-medium text-gray-900">{item.question}</span>
              {openItems.has(index) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openItems.has(index) && (
              <div className="pb-3 px-2 text-gray-600">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          New users only. Fair-use applies. Terms may change.
        </p>
      </div>
    </Card>
  );
};
