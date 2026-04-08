import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,  PieChart, Pie, Cell, Legend } from "recharts";
import { motion } from "framer-motion";

const COLORS = ["#63a1f1", "#10b3b9", "#e4ae50cb", "#ef44d8cd", "#9c5cf6e0"];

function Charts({ transactions }) {
  const lineData = (transactions || []).map((t) => ({
    date: t.date.split("-").slice(1).join("/"),
    amount: t.amount
  }));

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.entries(categoryMap).map(
    ([name, value], i) => ({
      name,
      value,
      fill: COLORS[i % COLORS.length]
    })
  );

  return (
    <div className="charts-grid">

      {/* BAR CHART */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Expense Trends
        </h3>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={lineData}>
              <XAxis dataKey="date"   tick={{ fontSize: 10 }} interval="preserveStartEnd" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#63a1f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* DOUGHNUT CHART */}
      <motion.div
        className="glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Expense Breakdown
        </h3>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={60} 
                outerRadius={90}
                paddingAngle={3}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.fill}
                    stroke="none"
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}

export default Charts;