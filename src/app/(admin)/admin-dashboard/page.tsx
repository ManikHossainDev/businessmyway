"use client";

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Welcome back</h2>
        <p className="mt-1 text-[#8A8174]">Overview of store activity and quick actions.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {[
          { label: "Orders today", value: "0" },
          { label: "Pending shipments", value: "0" },
          { label: "Low stock items", value: "0" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[#E8E0D4] bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-[#8A8174]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
