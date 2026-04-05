import React from "react";
import { BarChart,  Bar,  XAxis,  YAxis,  Tooltip,  ResponsiveContainer,  PieChart,  Pie,  Cell,  Legend} from "recharts";
import { motion } from 'framer-motion';

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

function Charts({ transactions }) {
  const lineData = (transactions || []).map((t) => ({
    date: t.date.split('-').slice(1).join('/'),
    amount: t.amount
  }));

  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    }
  });
  const pieData = Object.entries(categoryMap).map(([name, value], i) => ({
    name, value, fill: COLORS[i % COLORS.length]
  }));

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div className="glass-card dark:glass-card-dark p-8" data-aos="fade-right">
        <div className="glass-card">
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Expense Trends Over Time
          </h3>
        </div>

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={lineData}>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(255,255,255,0.9)",
                  borderRadius: "10px",
                  border: "none"
                }}
              />
              <Bar
                dataKey="amount"
                fill="#2169d4"
                radius={[6, 6, 0, 0]} /* smooth top corners */
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>


      {/* Pie Chart */}
      <motion.div className="glass-card dark:glass-card-dark p-8" data-aos="fade-left">
        <div className="glass-card">
          <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
            Transaction Trends
          </h3>
        </div>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Charts;
