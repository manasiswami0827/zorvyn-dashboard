import React, { useState } from "react";
import { transactions as mockTransactions } from "../data/mockData";
import SummaryCards from "./SummaryCards";
import Charts from "./Charts";
import Transactions from "./Transactions";
import AddTransactionForm from "./AddTransactionForm";

function Dashboard({ role }) {
  const [transactions, setTransactions] = useState(mockTransactions);


  const handleAddTransaction = (newTransaction) => {
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <div className="container py-12">
     
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "800", fontFamily:"Georgia, 'Times New Roman', Times, serif"}}>
          Finance Dashboard
        </h1>
       </div>
      {role !== 'viewer' && (
        <AddTransactionForm onAddTransaction={handleAddTransaction} />
      )}

        <SummaryCards transactions={transactions} />
        <Charts transactions={transactions} />
        <Transactions transactions={transactions} role={role} />
    </div>
  );
}

export default Dashboard;