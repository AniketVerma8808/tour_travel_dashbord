import { useEffect, useState } from "react";
import { createBannerService } from "../../services/banner.service";
import toast from "react-hot-toast";

const BannerFormModal = ({
  open,
  onClose,
  form,
  setForm,
  onSuccess,
  loading,
  setLoading,
}) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!form.image) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(form.image);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [form.image]);

  const resetForm = () => {
    setForm({
      image: null,
      order: 0,
      isActive: true,
    });
    setPreview("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image) {
      toast.error("Please select a banner image.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", form.image);
      formData.append("order", form.order);
      formData.append("isActive", form.isActive);

      const res = await createBannerService(formData);

      if (res.data.success) {
        toast.success(
          res.data.message || "Banner created successfully."
        );

        resetForm();
        onSuccess();
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Failed to create banner."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-5">

      <div className="bg-white rounded-[18px] w-full max-w-2xl overflow-hidden shadow-xl">

        {/* Header */}

        <div className="flex justify-between items-center px-6 py-5 border-b border-[var(--color-border)]">

          <div>

            <h2 className="table-title">
              Add Banner
            </h2>

            <p className="text-sm text-[var(--color-text-light)] mt-1">
              Upload homepage banner image
            </p>

          </div>

          <button
            onClick={handleClose}
            className="text-3xl text-gray-400 hover:text-black"
          >
            ×
          </button>

        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* Image */}

          <div>

            <label className="form-label">
              Banner Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) =>
                setForm({
                  ...form,
                  image: e.target.files[0],
                })
              }
            />

          </div>

          {/* Preview */}

          {preview && (

            <div>

              <label className="form-label">
                Preview
              </label>

              <div className="rounded-xl overflow-hidden border border-[var(--color-border)]">

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-60 object-cover"
                />

              </div>

            </div>

          )}

          {/* Order */}

          <div>

            <label className="form-label">
              Display Order
            </label>

            <input
              type="number"
              className="form-control"
              value={form.order}
              onChange={(e) =>
                setForm({
                  ...form,
                  order: Number(e.target.value),
                })
              }
            />

          </div>

          {/* Status */}

          <div className="flex items-center gap-3">

            <input
              id="activeBanner"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({
                  ...form,
                  isActive: e.target.checked,
                })
              }
            />

            <label
              htmlFor="activeBanner"
              className="font-medium"
            >
              Active Banner
            </label>

          </div>

          {/* Footer */}

          <div className="border-t border-[var(--color-border)] pt-5 flex justify-end gap-3">

            <button
              type="button"
              onClick={handleClose}
              className="btn-outline"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50"
            >
              {loading
                ? "Uploading..."
                : "Create Banner"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default BannerFormModal;