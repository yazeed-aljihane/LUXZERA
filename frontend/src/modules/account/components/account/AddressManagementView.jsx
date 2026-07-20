import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Copy, Check, Star, MapPin } from "lucide-react";
import { getAddresses, createAddress, updateAddress, deleteAddress, setDefaultAddress } from "@/modules/account/services/users/userService";
import Loader from "@/shared/components/ui/Loader";

const AddressManagementView = ({ userId }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  
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

  const loadAddresses = async () => {
    if (!userId) return;
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getAddresses(userId);
      setAddresses(data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load saved addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, [userId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.addressLine1 || !formData.city || !formData.fullName || !formData.phoneNumber) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setErrorMsg("");
    try {
      if (editingId) {
        await updateAddress(userId, { ...formData, id: editingId });
      } else {
        await createAddress(userId, formData);
      }
      setIsFormOpen(false);
      setEditingId(null);
      await loadAddresses();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to save address. Please verify your input.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setErrorMsg("");
    try {
      await deleteAddress(userId, id);
      await loadAddresses();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to delete address. Please try again.");
    }
  };

  const handleSetDefault = async (id) => {
    setErrorMsg("");
    try {
      await setDefaultAddress(userId, id);
      await loadAddresses();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to update default address. Please try again.");
    }
  };

  const handleCopyAddress = (addr) => {
    const textToCopy = `${addr.fullName}\n${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}\n${addr.city}, ${addr.state} - ${addr.postalCode}\n${addr.country}\nPhone: ${addr.phoneNumber}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(addr.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="py-10 text-center">
        <Loader size="w-8 h-8" className="mb-4" />
        <p className="text-sm text-slate-500 font-medium">Loading your addresses...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center pb-6 border-b border-slate-100 mb-6">
        <h2 className="text-xl font-bold text-[#2D3436] tracking-tight">
          {isFormOpen ? (editingId ? "Edit Address" : "Add New Address") : "Saved Addresses"}
        </h2>
        {!isFormOpen && (
          <button 
            onClick={handleAddNewToggle} 
            className="text-xs font-bold text-[#FF8C33] hover:text-[#e67e2e] transition"
          >
            + Add New Address
          </button>
        )}
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-xs font-semibold text-red-600">
          {errorMsg}
        </div>
      )}

      {isFormOpen ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number *</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Postal Code *</label>
              <input type="text" name="postalCode" value={formData.postalCode} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Address Line 1 *</label>
              <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div className="col-span-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Address Line 2</label>
              <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">State *</label>
              <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border border-slate-200 focus:border-[#FF8C33] bg-white rounded-xl px-4 py-2.5 text-sm outline-none transition" required />
            </div>
          </div>
          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button type="button" onClick={() => setIsFormOpen(false)} className="px-5 py-2.5 border border-slate-200 rounded-xl text-xs text-[#2D3436] font-semibold hover:bg-slate-50 transition">Cancel</button>
            <button type="submit" className="px-5 py-2.5 bg-[#FF8C33] hover:bg-[#e67e2e] text-white rounded-xl text-xs font-semibold shadow-md shadow-orange-500/10 transition">
              {editingId ? "Update Address" : "Save Address"}
            </button>
          </div>
        </form>
      ) : addresses.length === 0 ? (
        <div className="py-12 text-center bg-[#F9F9F9] rounded-2xl border border-dashed border-slate-200">
          <MapPin size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-[#2D3436]">No saved addresses yet</p>
          <p className="text-xs text-slate-400 mt-1 mb-4">Add your shipping details to enable fast checkout.</p>
          <button onClick={handleAddNewToggle} className="px-4 py-2 bg-[#FF8C33] hover:bg-[#e67e2e] text-white text-xs font-bold rounded-xl shadow-sm transition">
            + Add New Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((addr) => (
            <div 
              key={addr.id} 
              className={`border rounded-2xl p-5 bg-white shadow-[0_4px_16px_rgba(0,0,0,0.01)] flex justify-between items-start transition-all duration-200 ${
                addr.isDefault 
                  ? "border-[#FF8C33]/60 ring-1 ring-[#FF8C33]/20 shadow-[0_8px_20px_rgba(255,140,51,0.05)]" 
                  : "border-slate-200/60 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-sm font-bold text-[#2D3436]">{addr.fullName}</span>
                  {addr.isDefault ? (
                    <span className="text-[9px] font-extrabold tracking-wider uppercase bg-orange-50 text-[#FF8C33] border border-orange-100 px-2 py-0.5 rounded">Default</span>
                  ) : (
                    <button 
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[9px] font-bold text-slate-400 hover:text-[#FF8C33] flex items-center gap-1 transition"
                      title="Set as default address"
                    >
                      <Star size={10} /> Set as default
                    </button>
                  )}
                </div>
                <p className="text-sm text-[#2D3436]/75 leading-relaxed">
                  {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}<br />
                  {addr.city}, {addr.state} — <span className="font-semibold text-[#2D3436]">{addr.postalCode}</span><br />
                  {addr.country}
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-3">Phone: {addr.phoneNumber}</p>
              </div>

              <div className="flex items-center gap-1">
                <button 
                  onClick={() => handleCopyAddress(addr)}
                  className={`p-2 rounded-lg transition-colors ${copiedId === addr.id ? "text-emerald-600 bg-emerald-50" : "text-slate-400 hover:text-[#2D3436] hover:bg-slate-50"}`}
                  title="Copy full address"
                >
                  {copiedId === addr.id ? <Check size={15} /> : <Copy size={15} />}
                </button>
                <button onClick={() => handleEditToggle(addr)} className="p-2 text-slate-400 hover:text-[#2D3436] rounded-lg hover:bg-slate-50 transition-colors" title="Edit Address">
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