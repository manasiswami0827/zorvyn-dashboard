import React, { useState } from 'react';
import { Plus, Calendar, Tag, MessageCircle, Wallet, CheckCircle } from 'lucide-react';

function AddTransactionForm({ onAddTransaction }) {
  const [formData, setFormData] = useState({ 
    amount: '', 
    category: '', 
    type: 'expense', 
    date: new Date().toISOString().split('T')[0], 
    notes: '' 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));

      const newTransaction = {
        id: Date.now(),
        ...formData,
        amount: parseFloat(formData.amount)
      };

      onAddTransaction && onAddTransaction(newTransaction);

      setSubmitStatus('success');

      setFormData({ 
        amount: '', 
        category: '', 
        type: 'expense', 
        date: new Date().toISOString().split('T')[0], 
        notes: '' 
      });

      setTimeout(() => setSubmitStatus(null), 2500);

    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="form-card">

        {submitStatus === 'success' && (
          <div className="status success">
            <CheckCircle size={18}/> Transaction saved
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="status error">
            Something went wrong
          </div>
        )}

        {/* HEADER */}
        <div className="form-header">
          <div className="icon-box"><Plus size={20}/></div>
          <div>
            <h3>Add Transaction</h3>
            <p>Track your finances</p>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="form-grid">

          <div className="form-group full">
            <label><Wallet size={14}/> Amount</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="₹ 2500"
              required
            />
          </div>

          <div className="form-group">
            <label><Calendar size={14}/> Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label><Tag size={14}/> Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group full">
            <label><Tag size={14}/> Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              placeholder="Food, Salary..."
            />
          </div>

          <div className="form-group full">
            <label><MessageCircle size={14}/> Notes</label>
            <textarea
              rows="3"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Optional..."
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? "Saving..." : "Save Transaction"}
          </button>

        </form>
      </section>

      {/* ✅ CSS INSIDE SAME FILE */}
      <style>{`
        .form-card {
          max-width: 650px;
          margin: auto;
          padding: 20px;
          border-radius: 14px;
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(0,0,0,0.05);
          backdrop-filter: blur(10px);
        }

        body.dark .form-card {
          background: rgba(30,41,59,0.9);
          border-color: rgba(255,255,255,0.08);
        }

        .form-header {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 20px;
        }

        .icon-box {
          padding: 10px;
          border-radius: 10px;
          background: #eef2ff;
        }

        body.dark .icon-box {
          background: #2e5281;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-group.full {
          grid-column: span 2;
        }

        input, select, textarea {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #cbd5e1;
          background: white;
        }

        body.dark input,
        body.dark select,
        body.dark textarea {
          background: #1e293b;
          border-color: #334155;
          color: white;
        }

        input:hover, select:hover, textarea:hover {
          border-color: #0e69d8;
        }

        body.dark input:hover,
        body.dark select:hover,
        body.dark textarea:hover {
          border-color: #0e69d8;
        }

        .submit-btn {
          grid-column: span 2;
          padding: 12px;
          border-radius: 8px;
          border: none;
          background: #0e69d8;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .submit-btn:hover {
          background: #0e69d8;
        }

        body.dark .submit-btn:hover {
          background: #0e69d8;
        }

        .status {
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 15px;
          font-size: 14px;
        }

        .success {
          background: #dcfce7;
          color: #166534;
        }

        .error {
          background: #fee2e2;
          color: #991b1b;
        }

        body.dark .success {
          background: #14532d;
          color: #bbf7d0;
        }

        body.dark .error {
          background: #7f1d1d;
          color: #fecaca;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-group.full {
            grid-column: span 1;
          }
        }
      `}</style>
    </>
  );
}

export default AddTransactionForm;
