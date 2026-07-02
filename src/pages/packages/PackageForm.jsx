import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import {
  createPackageService,
  getPackageByIdService,
  updatePackageService,
} from "../../services/package.service";

import { TailSpin } from "react-loader-spinner";

const PackageForm = () => {
  const { id } = useParams();
  console.log("Package ID =>", id);
  const navigate = useNavigate();

  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const { register, handleSubmit, control, watch, reset, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      category: "",
      vehicle: "Innova Crysta",
      startingLocation: "Varanasi",
      destinationLocation: "",

      duration: "",
      distance: "",

      baseKm: 250,
      extraKmRate: 17,

      price: "",
      oldPrice: "",

      shortDescription: "",
      description: "",
      inclusions: [""],
      exclusions: [""],

      displayOrder: 0,

      isFeatured: false,

      status: "active",
      image: null,
    },
  });

  const {
    fields: inclusionFields,
    append: addInclusion,
    remove: removeInclusion,
  } = useFieldArray({
    control,
    name: "inclusions",
  });

  const {
    fields: exclusionFields,
    append: addExclusion,
    remove: removeExclusion,
  } = useFieldArray({
    control,
    name: "exclusions",
  });

  const imageFile = watch("image");

  useEffect(() => {
    if (
      imageFile &&
      imageFile.length > 0
    ) {
      const url =
        URL.createObjectURL(
          imageFile[0]
        );

      setPreview(url);

      return () =>
        URL.revokeObjectURL(url);
    }
  }, [imageFile]);


  const fetchPackage = async () => {
    try {
      setFetching(true);
      setError("");

      const res = await getPackageByIdService(id);
      console.log("API Response:", res.data);
      if (res.data.success) {
        const pkg = res.data.package;
        reset({
          ...pkg,
          image: null,
          inclusions: pkg.inclusions?.length ? pkg.inclusions : [""],
          exclusions: pkg.exclusions?.length ? pkg.exclusions : [""],
        });
        if (pkg.image) {
          setPreview(pkg.image);
        } else {
          setError("Package not found")
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to fetch package"
      );
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchPackage();
    }
  }, [id]);


  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "image") return;

        if (
          key === "inclusions" ||
          key === "exclusions"
        ) {
          formData.append(
            key,
            JSON.stringify(data[key])
          );
        } else {
          formData.append(
            key,
            data[key]
          );
        }
      });

      if (
        data.image &&
        data.image.length > 0
      ) {
        formData.append(
          "image",
          data.image[0]
        );
      }

      if (isEdit) {
        await updatePackageService(
          id,
          formData
        );
      } else {
        await createPackageService(
          formData
        );
      }

      navigate("/packages");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
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
    <div className="page max-w-5xl mx-auto">

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

        <div>

          <label className="form-label">
            Package Image
          </label>

          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="form-control"
          />

          {preview && (
            <div className="mt-4">

              <img
                src={preview}
                alt="Preview"
                className="w-44 h-32 object-cover rounded-lg border"
              />

            </div>
          )}

        </div>

        {/* ================= TITLE ================= */}

        <div>

          <label className="form-label">
            Package Title
          </label>

          <input
            className="form-control"
            placeholder="Ayodhya Darshan"
            {...register("title", {
              required:
                "Package title is required",
            })}
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </p>
          )}

        </div>

        <div className="grid md:grid-cols-2 gap-5">
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
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
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

        {/* ================= START + DESTINATION ================= */}

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="form-label">
              Starting Location
            </label>

            <input
              {...register(
                "startingLocation"
              )}
              className="form-control"
            />
          </div>

          <div>
            <label className="form-label">
              Destination
            </label>

            <input
              {...register(
                "destinationLocation"
              )}
              className="form-control"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="form-label">
              Duration
            </label>

            <input
              {...register("duration")}
              className="form-control"
              placeholder="1 Day / Full Day" />
          </div>

          <div>
            <label className="form-label">
              Distance (KM)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="250"
              {...register("distance", {
                valueAsNumber: true,
              })}
            />
          </div>

        </div>


        {/* ================= BASE KM + EXTRA KM ================= */}

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="form-label">
              Base KM
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="250"
              {...register("baseKm", {
                valueAsNumber: true,
              })}
            />

          </div>

          <div>

            <label className="form-label">
              Extra KM Rate (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="17"
              {...register("extraKmRate", {
                valueAsNumber: true,
              })}
            />

          </div>

        </div>


        {/* ================= PRICE DETAILS ================= */}

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="form-label">
              Package Price (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="4250"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}

          </div>

          <div>

            <label className="form-label">
              Old Price (₹)
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="5000"
              {...register("oldPrice", {
                valueAsNumber: true,
              })}
            />

          </div>

        </div>

        {/* ================= DISPLAY ORDER + STATUS ================= */}

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="form-label">
              Display Order
            </label>

            <input
              type="number"
              className="form-control"
              placeholder="0"
              {...register("displayOrder", {
                valueAsNumber: true,
              })}
            />

          </div>

          <div>

            <label className="form-label">
              Status
            </label>

            <select
              className="form-control"
              {...register("status")}
            >
              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>

          </div>

        </div>

        {/* ================= FEATURED ================= */}

        <div className="flex items-center gap-3">

          <input
            id="featured"
            type="checkbox"
            className="h-5 w-5"
            {...register("isFeatured")}
          />

          <label
            htmlFor="featured"
            className="font-medium"
          >
            Show as Featured Package
          </label>

        </div>

        {/* SHORT DESCRIPTION */}

        <div>
          <label className="form-label">
            Short Description
          </label>

          <textarea
            rows={3}
            {...register("shortDescription")}
            className="form-control"
            placeholder="Short description..."
          />
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="form-label">
            Full Description
          </label>

          <textarea
            rows={6}
            {...register("description")}
            className="form-control"
            placeholder="Write package details..."
          />
        </div>

        {/* INCLUSIONS & EXCLUSIONS */}

        {/* ================= INCLUSIONS ================= */}
        <div>

          <div className="flex items-center justify-between mb-3">

            <label className="form-label mb-0">
              Inclusions
            </label>

            <button
              type="button"
              onClick={() =>
                addInclusion("")
              }
              className="btn-primary text-sm px-3 py-1"
            >
              + Add
            </button>

          </div>

          <div className="space-y-3">

            {inclusionFields.map(
              (field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3"
                >

                  <input
                    className="form-control flex-1"
                    placeholder="Driver Allowance Included"
                    {...register(
                      `inclusions.${index}`
                    )}
                  />

                  {inclusionFields.length >
                    1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeInclusion(
                            index
                          )
                        }
                        className="px-4 rounded bg-red-500 text-white"
                      >
                        ×
                      </button>
                    )}

                </div>
              )
            )}

          </div>

        </div>
        {/* ================= EXCLUSIONS ================= */}

        <div>

          <div className="flex items-center justify-between mb-3">

            <label className="form-label mb-0">
              Exclusions
            </label>

            <button
              type="button"
              onClick={() =>
                addExclusion("")
              }
              className="btn-primary text-sm px-3 py-1"
            >
              + Add
            </button>

          </div>

          <div className="space-y-3">

            {exclusionFields.map(
              (field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3"
                >

                  <input
                    className="form-control flex-1"
                    placeholder="Toll Tax Extra"
                    {...register(
                      `exclusions.${index}`
                    )}
                  />

                  {exclusionFields.length >
                    1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeExclusion(
                            index
                          )
                        }
                        className="px-4 rounded bg-red-500 text-white"
                      >
                        ×
                      </button>
                    )}

                </div>
              )
            )}

          </div>

        </div>

        {/* ================= ACTION BUTTONS ================= */}

        <div className="flex justify-end gap-4 pt-6 border-t">

          <button
            type="button"
            onClick={() => navigate("/packages")}
            className="px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary min-w-[180px] flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <TailSpin
                  height={18}
                  width={18}
                  color="#fff"
                />
                {isEdit
                  ? "Updating..."
                  : "Saving..."}
              </>
            ) : (
              <>
                {isEdit
                  ? "Update Package"
                  : "Create Package"}
              </>
            )}
          </button>

        </div>

      </form>

    </div>
  );
};

export default PackageForm;