import { useState, useMemo } from "react";
import { SearchBar } from "@/components/Dashboard/SearchBar";
import { FilterGroup } from "@/components/Dashboard/FilterGroup";
import { TransactionItem } from "@/components/Dashboard/TransactionItem";
import { TransactionDetailsModal } from "@/components/Dashboard/TransactionDetailsModal";
import { EmptyState } from "@/components/Dashboard/EmptyState";

interface Transaction {
  id: number;
  name: string;
  type: string;
  status: "pending" | "received";
  amount: string;
  date: string;
}

export const TransactionHistoryPage = (): JSX.Element => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data
  const allTransactions: Transaction[] = [
    {
      id: 1,
      name: "Steve John",
      type: "Payment",
      status: "pending",
      amount: "$2,500.00",
      date: "4 October 2025"
    },
    {
      id: 2,
      name: "Steve John",
      type: "Payment",
      status: "received",
      amount: "$2,500.00",
      date: "3 October 2025"
    },
    {
      id: 3,
      name: "Steve John",
      type: "Payment",
      status: "received",
      amount: "$2,500.00",
      date: "2 October 2025"
    },
    {
      id: 4,
      name: "Alice Smith",
      type: "Transfer",
      status: "pending",
      amount: "$1,200.00",
      date: "1 October 2025"
    },
    {
      id: 5,
      name: "Bob Wilson",
      type: "Payment",
      status: "received",
      amount: "$3,100.00",
      date: "30 September 2025"
    }
  ];

  // Filter options
  const filterOptions = [
    { label: "All Types", value: "all", active: activeFilter === "all" },
    { label: "Received", value: "received", active: activeFilter === "received" },
    { label: "Pending", value: "pending", active: activeFilter === "pending" }
  ];

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions;

    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(t => t.status === activeFilter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toString().includes(searchTerm)
      );
    }

    return filtered;
  }, [allTransactions, activeFilter, searchTerm]);

  // Handlers
  const handleFilterChange = (filterValue: string) => {
    setActiveFilter(filterValue);
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setActiveFilter("all");
  };

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Transaction history</h1>
      
      {/* Search Bar */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search by client name or number"
      />

      {/* Filter Group */}
      <FilterGroup
        filters={filterOptions}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        timeFilter="All Time"
        onTimeFilterChange={() => {}}
      />

      {/* Transaction Count */}
      <div className="mb-6 text-gray-600">
        Showing {filteredTransactions.length} out of {allTransactions.length} transactions
      </div>

      {/* Transaction List or Empty State */}
      {filteredTransactions.length === 0 ? (
        searchTerm || activeFilter !== "all" ? (
          // No results found state
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : (
          // Empty state for no transactions at all
          <EmptyState
            title="Track payments from clients and transfers to your INR account — all in one place."
            description="No transactions yet. Your payments will appear here once clients start paying you."
          />
        )
      ) : (
        // Transaction List
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              name={transaction.name}
              type={transaction.type}
              status={transaction.status}
              amount={transaction.amount}
              onClick={() => handleTransactionClick(transaction)}
            />
          ))}
        </div>
      )}

      {/* Transaction Details Modal */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};
