import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  getAllPackagesService,
  updatePackageStatusService,
  deletePackageService
} from "../../services/package.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PackageViewModal from "../../components/package/PackageViewModal";


const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [openView, setOpenView] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [updatingId, setUpdatingId] = useState(null);

  const navigate = useNavigate();

  const fetchPackages = async (currentPage = page, currentLimit = limit) => {
    try {
      setLoading(true);
      setError("");

      const res = await getAllPackagesService({
        page: currentPage,
        limit: currentLimit,
      });
      console.log("res", res)
      if (res.data?.success) {
        setPackages(res.data.packages || []);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.page || 1);
      } else {
        setPackages([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(page, limit);
  }, [page, limit]);

  const handleStatus = async (id, status) => {
    try {
      setUpdatingId(id);

      await updatePackageStatusService(id, status);

      setPackages((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status } : p
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (!confirmDelete) return;
    try {
      setUpdatingId(id);

      const res = await deletePackageService(id);

      if (res.data.success) {
        setPackages((prev) =>
          prev.filter((p) => p._id !== id)
        );
      } else {
        toast(res.data.message);
      }
    } catch (err) {
      toast(
        err.response?.data?.message ||
        "Failed to delete package"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="page">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="page-title">Packages</h1>
          <p className="page-subtitle">Manage travel packages</p>
        </div>

        <button
          onClick={() => navigate("/packages/create")}
          className="btn-primary"
        >
          Add Package
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="status status-danger mb-4">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="table-card">

        <div className="p-4 border-b border-[var(--color-border)]">
          <h2 className="table-title">All Packages</h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">
            <thead className="table-header">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Package</th>
                <th className="p-4">Route</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-t border-[var(--color-border)]">
                    {[...Array(11)].map((_, j) => (
                      <td key={j} className="p-4">
                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : packages.length === 0 ? (
                <tr>
                  <td colSpan="11" className="p-8 text-center text-gray-500">
                    No packages found.
                  </td>
                </tr>
              ) : (
                packages.map((p) => (
                  <tr
                    key={p._id}
                    className="border-t border-[var(--color-border)] hover:bg-gray-50"
                  >
                    {/* IMAGE */}
                    <td className="p-4">
                      {p.image ? (
                        <img
                          src={`${import.meta.env.VITE_IMAGE_URL}/${p.image}`}
                          alt={p.title}
                          className="w-20 h-14 rounded-lg object-cover border"
                        />
                      ) : (
                        <div className="w-20 h-14 rounded-lg border bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>
                    <td className="p-4 min-w-[240px]">
                      <div className="font-semibold">
                        {p.title}
                      </div>

                      <div className="text-xs text-gray-500 mt-1">
                        {p.category?.replace("-", " ")}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="text-sm font-medium">
                        {p.startingLocation}
                      </div>

                      {p.destinationLocation && (
                        <div className="text-xs text-gray-500">
                          →
                          {p.destinationLocation}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      {p.oldPrice && (
                        <div className="text-xs text-gray-400 line-through">
                          ₹{p.oldPrice}
                        </div>
                      )}

                      <div className="font-semibold text-[var(--color-primary)]">
                        ₹{p.price}
                      </div>
                    </td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={
                          p.status === "active"
                            ? "status status-success"
                            : "status status-danger"
                        }
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => {
                          setSelectedPackage(p);
                          setOpenView(true);
                        }}
                        className="btn-outline"
                      >
                        View
                      </button>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            navigate(`/packages/edit/${p._id}`)
                          }
                          className="btn-outline text-sm"
                        >
                          Edit
                        </button>

                        {p.status === "active" ? (
                          <button
                            disabled={updatingId === p._id}
                            onClick={() =>
                              handleStatus(p._id, "inactive")
                            }
                            className="btn-danger text-sm"
                          >
                            {updatingId === p._id
                              ? "Loading..."
                              : "Deactivate"}
                          </button>
                        ) : (
                          <button
                            disabled={updatingId === p._id}
                            onClick={() =>
                              handleStatus(p._id, "active")
                            }
                            className="btn-primary text-sm"
                          >
                            {updatingId === p._id
                              ? "Loading..."
                              : "Activate"}
                          </button>
                        )}

                        <button
                          disabled={
                            updatingId === p._id ||
                            p.status === "active"
                          }
                          onClick={() =>
                            handleDelete(p._id)
                          }
                          className="btn-danger text-sm"
                        >
                          {updatingId === p._id
                            ? "Loading..."
                            : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>

        <PackageViewModal
          open={openView}
          onClose={() => setOpenView(false)}
          data={selectedPackage}
        />

        {/* ================= PAGINATION (GOOGLE STYLE) ================= */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-[var(--color-border)]">

          {/* Left info */}
          <div className="text-sm text-[var(--color-text-light)]">
            Page <b>{page}</b> of <b>{totalPages}</b>
          </div>

          {/* Middle controls */}
          <div className="flex items-center gap-2">

            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const p = i + 1;

              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`px-3 py-1 text-sm rounded-md border ${page === p
                    ? "bg-[var(--color-primary)] text-white"
                    : ""
                    }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded-md text-sm disabled:opacity-40"
            >
              Next
            </button>

          </div>

          {/* Right limit selector */}
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded-md px-2 py-1 text-sm"
          >
            <option value={5}>5 / page</option>
            <option value={10}>10 / page</option>
            <option value={20}>20 / page</option>
            <option value={50}>50 / page</option>
          </select>

        </div>

      </div>
    </div>
  );
};

export default PackageList;