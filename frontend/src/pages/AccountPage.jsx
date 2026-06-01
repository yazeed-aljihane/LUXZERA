export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">

      <h1 className="text-5xl font-black uppercase tracking-tight text-[#0b2240]">
        My Account
      </h1>

      <p className="mt-4 text-slate-600">
        Manage your LuxZera profile and orders.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">

        <div className="border p-6">
          <h2 className="font-black uppercase">
            Profile
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Update your personal details.
          </p>
        </div>

        <div className="border p-6">
          <h2 className="font-black uppercase">
            Orders
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Track all purchases.
          </p>
        </div>

        <div className="border p-6">
          <h2 className="font-black uppercase">
            Wishlist
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Save products for later.
          </p>
        </div>

      </div>

    </div>
  );
}