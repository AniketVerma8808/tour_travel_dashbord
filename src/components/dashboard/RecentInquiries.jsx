const RecentInquiries = ({
  inquiries = [],
}) => {
  return (
    <div className="dashboard-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>

          <h2 className="text-xl font-semibold text-[var(--color-heading)]">
            Recent Inquiries
          </h2>

          <p className="text-sm text-[var(--color-text-light)] mt-1">
            Latest customer inquiries
          </p>

        </div>

        <div className="bg-gradient-to-r from-[#c9a227] to-[#e8c766] text-white px-4 py-2 rounded-xl shadow">
          <span className="font-semibold">
            {inquiries.length}
          </span>
        </div>

      </div>

      {/* Empty State */}
      {inquiries.length === 0 ? (
        <div className="py-10 text-center text-[var(--color-text-light)]">
          No inquiries found
        </div>
      ) : (

        <div className="space-y-4">

          {inquiries?.slice(0, 3).map((item) => (

            <div
              key={item._id}
              className="
                border
                border-[var(--color-border)]
                rounded-xl
                p-4
                hover:bg-gray-50
                transition
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <h4 className="font-semibold text-[var(--color-heading)]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-[var(--color-text-light)] mt-1">
                    {item.phone}
                  </p>

                </div>

                <span className="status status-info">
                  Inquiry
                </span>

              </div>

              <p className="text-sm text-[var(--color-text)] mt-3 line-clamp-2">
                {item.message}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default RecentInquiries;