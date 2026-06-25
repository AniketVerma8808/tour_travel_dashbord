const BannerPreviewModal = ({
  open,
  banner,
  onClose,
}) => {
  if (!open || !banner) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-[18px] p-6 w-[90%] max-w-3xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-gray-500"
        >
          ×
        </button>

        <h2 className="table-title mb-5">
          Banner Preview
        </h2>

        <img
          src={banner.image}
          alt="banner"
          className="w-full rounded-xl border"
        />

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="dashboard-card p-4">
            <p className="card-title">
              Display Order
            </p>

            <p className="text-xl font-semibold text-[var(--color-heading)] mt-2">
              {banner.order}
            </p>
          </div>

          <div className="dashboard-card p-4">
            <p className="card-title">
              Status
            </p>

            <div className="mt-3">
              <span
                className={
                  banner.isActive
                    ? "status status-success"
                    : "status status-danger"
                }
              >
                {banner.isActive
                  ? "Active"
                  : "Inactive"}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default BannerPreviewModal;