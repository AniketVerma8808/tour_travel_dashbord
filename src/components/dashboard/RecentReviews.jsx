const RecentReviews = ({
  reviews = [],
}) => {
  return (
    <div className="dashboard-card p-6 h-full">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <div>
          <h2 className="text-[18px] font-semibold text-[var(--color-heading)]">
            Recent Reviews
          </h2>

          <p className="text-sm text-[var(--color-text-light)]">
            Latest customer feedback
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#c9a227] to-[#e8c766] text-white shadow-md">
          ⭐
        </div>

      </div>

      {/* Reviews */}
      <div className="space-y-4">

        {reviews?.length > 0 ? (
          reviews?.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="p-4 rounded-2xl border border-[var(--color-border)] hover:border-[#c9a227] hover:shadow-md transition-all duration-300 bg-white"
            >
              <div className="flex items-start justify-between gap-3">

                <div>
                  <h4 className="font-semibold text-[var(--color-heading)]">
                    {item.name}
                  </h4>

                  <p className="text-xs text-[var(--color-text-light)] mt-1">
                    Customer Review
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm font-semibold border border-yellow-200">
                  ⭐ {item.rating}/5
                </div>

              </div>

              <p className="mt-3 text-sm text-[var(--color-text)] leading-relaxed line-clamp-3">
                {item.review}
              </p>

            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10">

            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
              ⭐
            </div>

            <p className="mt-3 text-[var(--color-text-light)]">
              No reviews available
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

export default RecentReviews;