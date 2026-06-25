import React, { useState } from "react";
import { Edit2, Trash2, Copy, Check } from "lucide-react";

const AddressManagementView = () => {
  const [addresses, setAddresses] = useState([
    {
      id: "d3b07384-d113-4ec6-a5d6-0a0e36504a9d",
      fullName: "Saketh Chokkapu",
      phoneNumber: "+91 98765 43210",
      addressLine1: "Flat 402, Luxury Heights",
      addressLine2: "Chandanagar",
      city: "Hyderabad",
      state: "Telangana",
      country: "India",
      postalCode: "500050",
      isDefault: true
    }
  ]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null); // Tracks clipboard success states
  
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    isDefault: false
  });

  const handleAddNewToggle = () => {
    setEditingId(null);
    setFormData({ fullName: "", phoneNumber: "", addressLine1: "", addressLine2: "", city: "", state: "", country: "India", postalCode: "", isDefault: false });
    setIsFormOpen(true);
  };

  const handleEditToggle = (address) => {
    setEditingId(address.id);
    setFormData({ ...address });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.addressLine1 || !formData.city || !formData.fullName) return;

    let updatedAddresses = [...addresses];
    if (formData.isDefault) {
      updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
    }

    if (editingId) {
      setAddresses(updatedAddresses.map(addr => addr.id === editingId ? { ...formData } : addr));
    } else {
      // FIX: Replaced crypto.randomUUID() with a Safari-safe fallback identifier string
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      setAddresses([
        ...updatedAddresses, 
        { ...formData, id: uniqueId, isDefault: addresses.length === 0 ? true : formData.isDefault }
      ]);
    }
    setIsFormOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    const remaining = addresses.filter(addr => addr.id !== id);
    if (addresses.find(addr => addr.id === id)?.isDefault && remaining.length > 0) {
      remaining[0].isDefault = true;
    }
    setAddresses(remaining);
  };

  // Connected copy function for compiled formatting
  const handleCopyAddress = (addr) => {
    const textToCopy = `${addr.fullName}\n${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}\n${addr.city}, ${addr.state} - ${addr.postalCode}\n${addr.country}\nPhone: ${addr.phoneNumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(addr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-6">
        <h2 className="text-xl font-semibold text-slate-950 tracking-tight">
          {isFormOpen ? (editingId ? "Edit Address" : "Add New Address") : "Saved Addresses"}
        </h2>
        {!isFormOpen && (
          <button onClick={handleAddNewToggle} className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition">
            + Add New Address
          </button>
        )}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Postal Code</label>
              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Address Line 1</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Address Line 2</label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">State</label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-blue-500 bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div className="col-span-2 flex items-center gap-2 pt-2">
              <input type="checkbox" id="isDefault" name="isDefault" checked={formData.isDefault} onChange={handleInputChange} className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 border-slate-300 cursor-pointer" />
              <label htmlFor="isDefault" className="text-xs font-medium text-slate-600 select-none cursor-pointer">Set as default delivery address</label>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 border border-slate-200 rounded-xl text-xs text-slate-600 font-medium hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition">
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-slate-200/60 rounded-2xl p-5 bg-white shadow-sm flex justify-between items-start hover:border-slate-300 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-slate-900">{addr.fullName}</span>
                  {addr.isDefault && (
                    <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-600 border border-blue-100 px-1.5 py-0.5 rounded">Default</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}<br />
                  {addr.city}, {addr.state} — <span className="font-medium text-slate-800">{addr.postalCode}</span><br />
                  {addr.country}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-3">Phone: {addr.phoneNumber}</p>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleCopyAddress(addr)}
                  className={`p-2 rounded-lg transition-colors ${copiedId === addr.id ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"}`}
                  title="Copy full address"
                >
                  {copiedId === addr.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <button onClick={() => handleEditToggle(addr)} className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-50 transition-colors" title="Edit Address">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(addr.id)} className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors" title="Delete Address">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressManagementView;