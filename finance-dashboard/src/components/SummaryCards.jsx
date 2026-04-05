import React from "react";
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

function SummaryCards({ transactions }) {
  const hasData = transactions && transactions.length > 0;
  
  const income = hasData 
    ? transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0)
    : 0;
  const expense = hasData 
    ? transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0)
    : 0;
  const balance = income - expense;

  if (!hasData) {
    return (
     <div className="kpi-grid">

  <div className="kpi-card card-lavender">
    <DollarSign size={40} className="icon" />
    <h2 className="amount">₹{balance.toLocaleString()}</h2>
    <p className="label">Net Balance</p>
  </div>

  <div className="kpi-card card-mint">
    <TrendingUp size={40} className="icon" />
    <h2 className="amount">₹{income.toLocaleString()}</h2>
    <p className="label">Total Income</p>
  </div>

  <div className="kpi-card card-coral">
    <TrendingDown size={40} className="icon" />
    <h2 className="amount">₹{expense.toLocaleString()}</h2>
    <p className="label">Total Expenses</p>
  </div>

</div>

    );
  }

  return (
    <div className="kpi-grid">

  <div className="kpi-card card-lavender">
    <DollarSign size={40} className="icon" />
    <h2 className="amount">₹{balance.toLocaleString()}</h2>
    <p className="label">Net Balance</p>
  </div>

  <div className="kpi-card card-mint">
    <TrendingUp size={40} className="icon" />
    <h2 className="amount">₹{income.toLocaleString()}</h2>
    <p className="label">Total Income</p>
  </div>

  <div className="kpi-card card-coral">
    <TrendingDown size={40} className="icon" />
    <h2 className="amount">₹{expense.toLocaleString()}</h2>
    <p className="label">Total Expenses</p>
  </div>

</div>

  );
}

export default SummaryCards;
