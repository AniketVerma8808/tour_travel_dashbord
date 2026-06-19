import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PackageChart = ({ stats }) => {
  const activePackages =
    stats.activePackages || 0;

  const totalPackages =
    stats.totalPackages || 0;

  const inactivePackages =
    totalPackages - activePackages;

  const data = [
    {
      name: "Active",
      value: activePackages,
    },
    {
      name: "Inactive",
      value: inactivePackages,
    },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
  ];

  return (
    <div className="dashboard-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-xl font-semibold text-[var(--color-heading)]">
            Package Analytics
          </h2>

          <p className="text-sm text-[var(--color-text-light)] mt-1">
            Active & inactive packages
          </p>

        </div>

        <div className="bg-gradient-to-r from-[#c9a227] to-[#e8c766] text-white px-4 py-2 rounded-xl shadow">

          <p className="text-xs opacity-90">
            Total
          </p>

          <p className="font-bold text-lg">
            {totalPackages}
          </p>

        </div>

      </div>

      {/* Chart */}
      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              innerRadius={65}
              outerRadius={105}
              paddingAngle={4}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="bg-green-50 border border-green-100 rounded-xl p-3">

          <p className="text-xs text-gray-500">
            Active Packages
          </p>

          <p className="font-bold text-green-600 text-lg">
            {activePackages}
          </p>

        </div>

        <div className="bg-red-50 border border-red-100 rounded-xl p-3">

          <p className="text-xs text-gray-500">
            Inactive Packages
          </p>

          <p className="font-bold text-red-600 text-lg">
            {inactivePackages}
          </p>

        </div>

      </div>

    </div>
  );
};

export default PackageChart;