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

     
    </>
  );
}

export default AddTransactionForm;
