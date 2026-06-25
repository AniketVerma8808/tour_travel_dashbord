import { useEffect, useState } from "react";
import {
    getAllBannersService,
    deleteBannerService,
} from "../../services/banner.service";

import BannerFormModal from "./BannerFormModal";
import BannerPreviewModal from "./BannerPreviewModal";



const BannerList = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState("");

    const [selectedBanner, setSelectedBanner] = useState(null);
    const [openForm, setOpenForm] = useState(false);

    const [form, setForm] = useState({
        image: null,
        order: 0,
        isActive: true,
    });

    const fetchBanners = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await getAllBannersService();

            const data = res?.data?.data || [];

            console.log("images", data);

            setBanners(data);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to fetch banners"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Delete this banner?"
        );

        if (!confirmDelete) return;

        try {
            await deleteBannerService(id);

            setBanners((prev) =>
                prev.filter((item) => item._id !== id)
            );
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Delete failed"
            );
        }
    };

    const resetForm = () => {
        setForm({
            image: null,
            order: 0,
            isActive: true,
        });
    };

    return (
        <div className="page">

            {/* Header */}

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h1 className="page-title">
                        Banner Management
                    </h1>

                    <p className="page-subtitle">
                        Manage homepage banners
                    </p>

                </div>

                <div className="flex gap-3">

                    <button
                        className="btn-primary"
                        onClick={() => {
                            resetForm();
                            setOpenForm(true);
                        }}
                    >
                        Add Banner
                    </button>

                    <button
                        className="btn-outline"
                        onClick={fetchBanners}
                    >
                        Refresh
                    </button>

                </div>

            </div>

            {error && (
                <div className="status status-danger mb-5">
                    {error}
                </div>
            )}

            {/* Table */}

            <div className="table-card">

                <div className="p-4 border-b border-[var(--color-border)]">

                    <h2 className="table-title">
                        All Banners
                    </h2>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="table-header">

                            <tr>

                                <th className="p-4 table-heading">
                                    Banner
                                </th>

                                <th className="p-4 table-heading">
                                    Order
                                </th>

                                <th className="p-4 table-heading">
                                    Status
                                </th>

                                <th className="p-4 table-heading">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr
                                        key={i}
                                        className="border-t border-[var(--color-border)]"
                                    >

                                        <td className="p-4">
                                            <div className="w-40 h-20 rounded-lg bg-gray-200 animate-pulse" />
                                        </td>

                                        <td className="p-4">
                                            <div className="h-4 w-10 rounded bg-gray-200 animate-pulse" />
                                        </td>

                                        <td className="p-4">
                                            <div className="h-5 w-20 rounded bg-gray-200 animate-pulse" />
                                        </td>

                                        <td className="p-4">
                                            <div className="h-8 w-28 rounded bg-gray-200 animate-pulse" />
                                        </td>

                                    </tr>
                                ))
                            ) : banners.length === 0 ? (
                                <tr>

                                    <td
                                        colSpan={4}
                                        className="text-center p-8"
                                    >
                                        No banners found.
                                    </td>

                                </tr>
                            ) : (
                                banners.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="table-row border-t border-[var(--color-border)]"
                                    >

                                        <td className="p-4">

                                            <img
                                                src={item.image}
                                                alt="banner"
                                                className="w-40 h-20 object-cover rounded-xl border"
                                                onError={(e) => {
                                                    e.target.src = "/placeholder.jpg";
                                                }}
                                            />

                                        </td>

                                        <td className="p-4">
                                            {item.order}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={
                                                    item.isActive
                                                        ? "status status-success"
                                                        : "status status-danger"
                                                }
                                            >
                                                {item.isActive
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-2">

                                                <button
                                                    className="btn-outline text-sm"
                                                    onClick={() =>
                                                        setSelectedBanner(item)
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    className="btn-danger text-sm"
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

            <BannerFormModal
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                    resetForm();
                }}
                form={form}
                setForm={setForm}
                loading={submitLoading}
                setLoading={setSubmitLoading}
                onSuccess={() => {
                    fetchBanners();
                    setOpenForm(false);
                    resetForm();
                }}
            />

            <BannerPreviewModal
                open={!!selectedBanner}
                banner={selectedBanner}
                onClose={() => setSelectedBanner(null)}
            />

        </div>
    );
};

export default BannerList;