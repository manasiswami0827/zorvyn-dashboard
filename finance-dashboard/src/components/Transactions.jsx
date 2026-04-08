import React, { useState, useMemo } from "react";
import { Search, Download, Plus, Edit3, Trash2 } from "lucide-react";
import AddTransactionForm from "./AddTransactionForm";

function Transactions({ transactions, role }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);


  // FILTER LOGIC (unchanged)
  const filteredData = useMemo(() => {
    return transactions.filter((t) => {
      const matchesSearch = t.category
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      const matchesFilter =
        filter === "all" || t.type.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  // EXPORT CSV
  const exportCSV = () => {
    if (filteredData.length === 0) return;

    const csv = [
      ["Date", "Category", "Amount", "Type"],
      ...filteredData.map((t) => [t.date, t.category, t.amount, t.type]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions_${new Date()
      .toISOString()
      .split("T")[0]}.csv`;

    a.click();
    URL.revokeObjectURL(url);
  };

  const hasData = filteredData.length > 0;

  return (
    <section className="glass-card">
      {/* HEADER */}
      <div className="table-header">
        <div className="header-top">
          <div>
            <h2 className="section-title">Recent Transactions</h2>
            <p className="section-subtitle">
              {hasData
                ? `${filteredData.length} transactions`
                : "No transactions yet"}
            </p>
          </div>

          {role !== "viewer" && (
            <button
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <Plus size={16} />
              {showForm ? "Close" : "Add"}
            </button>

          )}
        </div>
        {showForm && (
          <AddTransactionForm />
        )}
        {/* CONTROLS */}
        {hasData && (
          <div className="controls">
            {/* SEARCH */}
            <div className="search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search category..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* FILTER */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>

            {/* EXPORT */}
            <button className="btn-secondary" onClick={exportCSV}>
              <Download size={16} /> Export
            </button>
          </div>
        )}
      </div>

      {/* EMPTY STATE */}
      {!hasData && (
        <div className="empty-state">
          <p>No results for "{search}"</p>
          <p>Try adjusting your search or filters</p>

          <button
            className="btn-primary"
            onClick={() => {
              setSearch("");
              setFilter("all");
            }}
            style={{ marginTop: "12px" }}
          >
            Show All Transactions
          </button>
        </div>
      )}

      {/* TABLE */}
      {hasData && (
        <div className="table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th className="right">Amount</th>
                <th className="right">Type</th>
                {role === "admin" && <th className="right">Actions</th>}
              </tr>
            </thead>

            <tbody>
              {filteredData.map((t) => (
                <tr key={t.id} className="tr">
                  <td>
                    {new Date(t.date).toLocaleDateString("en-IN")}
                  </td>

                  <td>
                    <span
                      className={`category-badge ${t.type === "income" ? "income" : "expense"
                        }`}
                    >
                      {t.category}
                    </span>
                  </td>

                  <td
                    className={`amount ${t.type === "income" ? "positive" : "negative"
                      }`}
                  >
                    ₹{t.amount.toLocaleString()}
                  </td>

                  <td className="right">
                    <span className={`type-badge ${t.type}`}>
                      {t.type}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td className="right">
                      <button className="action-btn edit">
                        <Edit3 size={14} />
                      </button>
                      <button className="action-btn delete">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Transactions;
