import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPackageService,
  getPackageByIdService,
  updatePackageService,
} from "../../services/package.service";
import { TailSpin } from "react-loader-spinner";

const PackageForm = () => {
  const { id } = useParams();
  const isEdit = !!id;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      price: "",
      vehicle: "Innova Crysta",
      description: "",
      status: "active",
    },
  });

  // FETCH SINGLE PACKAGE
  const fetchPackage = async () => {
    try {
      setFetching(true);
      setError("");

      const res = await getPackageByIdService(id);

      if (res.data?.success) {
        reset(res.data.package);
      } else {
        setError("Package not found");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch package");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isEdit) fetchPackage();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      if (isEdit) {
        await updatePackageService(id, data);
      } else {
        await createPackageService(data);
      }

      navigate("/packages");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="page flex justify-center items-center">
        <TailSpin height={45} width={45} color="#c9a227" />
      </div>
    );
  }

  return (
    <div className="page max-w-3xl mx-auto">

      {/* HEADER */}
      <h1 className="page-title mb-2">
        {isEdit ? "Edit Package" : "Create Package"}
      </h1>

      <p className="page-subtitle mb-6">
        Fill all required details carefully
      </p>

      {/* ERROR */}
      {error && (
        <div className="status status-danger mb-4">
          {error}
        </div>
      )}

      {/* FORM CARD */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="table-card p-6 space-y-5"
      >

        {/* TITLE */}
        <div>
          <label className="form-label">Package Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="e.g. Ayodhya Darshan"
            className="form-control"
          />
        </div>

        {/* CATEGORY + VEHICLE */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="form-label">Category</label>
            <select
              {...register("category", { required: true })}
              className="form-control"
            >
              <option value="">Select Category</option>
              <option value="outstation-tour">Outstation Tour</option>
              <option value="local-tour">Local Tour</option>
              <option value="airport-transfer">Airport Transfer</option>
            </select>
          </div>

          <div>
            <label className="form-label">Vehicle</label>
            <input
              {...register("vehicle")}
              placeholder="Innova Crysta"
              className="form-control"
            />
          </div>

        </div>

        {/* PRICE */}
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="form-label">Price (₹)</label>
            <input
              type="number"
              {...register("price", { required: true })}
              placeholder="7480"
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label">Status</label>
            <select
              {...register("status")}
              className="form-control"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="form-label">Description</label>
          <textarea
            rows={5}
            {...register("description")}
            placeholder="Write package details..."
            className="form-control"
          />
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="btn-primary w-full flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <TailSpin height={18} width={18} color="#fff" />
              Saving...
            </>
          ) : (
            "Save Package"
          )}
        </button>

      </form>
    </div>
  );
};

export default PackageForm;