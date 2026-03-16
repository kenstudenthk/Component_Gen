import React, { useState, useEffect } from 'react';

// ============================================================================
// NOTE: For your actual GitHub repository, UNCOMMENT the following 3 lines 
// and DELETE the "CANVAS MOCKS" section below.
// ============================================================================
// import { useNavigate, Link } from 'react-router-dom';
// import { createComponent, getCategories } from '../lib/api';
// import Navbar from '../components/Navbar';

// --- START CANVAS MOCKS (To allow this file to compile in the preview) ---
const useNavigate = () => (path) => console.log("Navigating to:", path);
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;
const getCategories = async () => [
  { category: 'Navigation' }, 
  { category: 'Forms' }, 
  { category: 'Buttons' }
];
const createComponent = async (data) => { 
  console.log("Mock saved component:", data); 
  return { success: true }; 
};
const Navbar = () => (
  <header className="px-6 py-4 bg-slate-900 border-b border-slate-800 text-white font-bold">
    PowerHub Admin (Mock Navbar)
  </header>
);
// --- END CANVAS MOCKS ---

export default function AdminNew() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  
  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    yaml: ''
  });

  // Fetch existing categories from your Cloudflare D1 backend
  useEffect(() => {
    getCategories()
      .then(data => {
        if (data && Array.isArray(data)) {
          setCategories(data);
        }
      })
      .catch(err => {
        console.error("Failed to load categories:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Create a slug for the category
      const categorySlug = formData.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      
      const newComponent = {
        name: formData.name,
        category: formData.category,
        categorySlug: categorySlug,
        description: formData.description,
        yaml: formData.yaml,
        isCustom: true // Mark as custom to differentiate from seed data
      };
      
      const result = await createComponent(newComponent);
      
      if (result && result.success) {
        navigate('/admin'); // Go back to admin list after saving
      } else {
        throw new Error(result?.error || 'Failed to save component');
      }
    } catch (err) {
      console.error("Failed to create component", err);
      setError(err.message || "Failed to save component. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Add New Component</h1>
          <Link to="/admin" className="text-slate-400 hover:text-white transition-colors">
            Cancel & Back
          </Link>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
          
          {/* Name Field */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              Component Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. Modern Primary Button"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* Category Dropdown (Datalist) */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              Category
            </label>
            {/* The 'list' attribute connects this input to the datalist below */}
            <input
              type="text"
              name="category"
              list="existing-categories"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Select existing or type a new one..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
            {/* Datalist provides the dropdown options mapped from your API */}
            <datalist id="existing-categories">
              {categories.map((cat, index) => (
                <option key={index} value={cat.category} />
              ))}
            </datalist>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              Description (Optional)
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of this component..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
            />
          </div>

          {/* YAML Source Field */}
          <div>
            <label className="block text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">
              PowerApps YAML Code
            </label>
            <textarea
              name="yaml"
              value={formData.yaml}
              onChange={handleChange}
              required
              rows={12}
              placeholder={"- Control: Button\n  Properties:\n    Text: =\"Submit\""}
              className="w-full bg-black border border-slate-700 rounded-xl p-4 text-emerald-400 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all leading-relaxed shadow-inner"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
            >
              {isSubmitting ? 'Saving...' : 'Save Component'}
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}