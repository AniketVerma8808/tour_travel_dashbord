import React from "react";
import {
  X,
  Car,
  MapPin,
  Route,
  Clock,
  IndianRupee,
  Star,
  Calendar,
  CheckCircle2,
  XCircle,
  BadgeCheck,
} from "lucide-react";
import InfoCard from "./InfoCard";


const PackageViewModal = ({
  open,
  onClose,
  data,
}) => {
  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="relative w-full max-w-7xl max-h-[92vh] overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ================= HEADER ================= */}

        <div className="sticky top-0 z-20 bg-white border-b px-6 py-5 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              Package Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete package information
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-red-50 hover:text-red-600 transition flex items-center justify-center"
          >
            <X size={22} />
          </button>

        </div>

        {/* ================= BODY ================= */}

        <div className="overflow-y-auto max-h-[calc(92vh-82px)] p-6">

          {/* ================= TOP ================= */}

          <div className="grid lg:grid-cols-2 gap-8">

            {/* IMAGE */}

            <div>

              <div className="rounded-2xl overflow-hidden border bg-gray-100">

                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-[420px] object-cover"
                />

              </div>

            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-5">

              {/* Category */}

              <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 px-4 py-1 text-sm font-semibold">

                {data.category
                  ?.replaceAll("-", " ")
                  ?.toUpperCase()}

              </span>

              {/* Title */}

              <h1 className="text-3xl font-bold text-gray-900">

                {data.title}

              </h1>

              {/* Price */}

              <div className="flex items-end gap-3">

                <h2 className="text-4xl font-bold text-amber-600">

                  ₹{data.price?.toLocaleString()}

                </h2>

                {data.oldPrice && (

                  <span className="text-xl text-gray-400 line-through">

                    ₹{data.oldPrice?.toLocaleString()}

                  </span>

                )}

              </div>

              {/* Short Description */}

              {data.shortDescription && (

                <p className="text-gray-600 leading-7">

                  {data.shortDescription}

                </p>

              )}

              {/* Badges */}

              <div className="flex flex-wrap gap-3">

                {data.isFeatured && (

                  <span className="flex items-center gap-2 rounded-full bg-green-100 text-green-700 px-4 py-2 text-sm font-medium">

                    <Star size={16} />

                    Featured

                  </span>

                )}

                <span
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium
                  ${
                    data.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <BadgeCheck size={16} />

                  {data.status}

                </span>

              </div>

              {/* Quick Information */}

              <div className="grid sm:grid-cols-2 gap-4 pt-2">

                <InfoCard
                  title="Vehicle"
                  value={data.vehicle}
                  icon={<Car size={18} />}
                />

                <InfoCard
                  title="Duration"
                  value={data.duration}
                  icon={<Clock size={18} />}
                />

                <InfoCard
                  title="Distance"
                  value={`${data.distance} KM`}
                  icon={<Route size={18} />}
                />

                <InfoCard
                  title="Base KM"
                  value={`${data.baseKm} KM`}
                  icon={<Route size={18} />}
                />

                <InfoCard
                  title="Extra KM Rate"
                  value={`₹${data.extraKmRate} / KM`}
                  icon={<IndianRupee size={18} />}
                />

                <InfoCard
                  title="Display Order"
                  value={data.displayOrder}
                  icon={<Calendar size={18} />}
                />

              </div>

            </div>

          </div>

          {/* ================= ROUTE SECTION START ================= */}

                    <div className="mt-10">

            <div className="flex items-center gap-2 mb-5">

              <MapPin className="text-amber-600" size={22} />

              <h2 className="text-2xl font-bold text-gray-800">
                Route Information
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <InfoCard
                title="Starting Location"
                value={data.startingLocation}
                icon={<MapPin size={18} />}
              />

              <InfoCard
                title="Destination"
                value={
                  data.destinationLocation ||
                  "-"
                }
                icon={<MapPin size={18} />}
              />

            </div>

          </div>

          {/* ================= DESCRIPTION ================= */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Package Description
            </h2>

            <div className="rounded-xl border bg-gray-50 p-6">

              <p className="text-gray-700 leading-8 whitespace-pre-line">

                {data.description ||
                  "No description available."}

              </p>

            </div>

          </div>

          {/* ================= PRICING ================= */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Pricing Details
            </h2>

            <div className="grid lg:grid-cols-3 gap-5">

              <div className="rounded-xl border bg-amber-50 p-6">

                <p className="text-sm text-gray-500">
                  Current Price
                </p>

                <h3 className="mt-2 text-3xl font-bold text-amber-600">

                  ₹{data.price?.toLocaleString()}

                </h3>

              </div>

              <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-gray-500">
                  Old Price
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-gray-400 line-through">

                  {data.oldPrice
                    ? `₹${data.oldPrice.toLocaleString()}`
                    : "-"}

                </h3>

              </div>

              <div className="rounded-xl border bg-white p-6">

                <p className="text-sm text-gray-500">
                  Extra KM Charge
                </p>

                <h3 className="mt-2 text-2xl font-bold text-gray-800">

                  ₹{data.extraKmRate}/KM

                </h3>

              </div>

            </div>

          </div>

          {/* ================= INCLUSIONS & EXCLUSIONS ================= */}

          <div className="grid lg:grid-cols-2 gap-8 mt-10">

            {/* Inclusions */}

            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-bold text-green-700 mb-5">

                Included

              </h2>

              {data.inclusions?.length ? (

                <div className="space-y-3">

                  {data.inclusions.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <CheckCircle2
                          className="text-green-600 mt-0.5"
                          size={18}
                        />

                        <span className="text-gray-700">

                          {item}

                        </span>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-400">
                  No inclusions available.
                </p>

              )}

            </div>

            {/* Exclusions */}

            <div className="rounded-2xl border p-6">

              <h2 className="text-xl font-bold text-red-700 mb-5">

                Excluded

              </h2>

              {data.exclusions?.length ? (

                <div className="space-y-3">

                  {data.exclusions.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >

                        <XCircle
                          className="text-red-500 mt-0.5"
                          size={18}
                        />

                        <span className="text-gray-700">

                          {item}

                        </span>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-gray-400">
                  No exclusions available.
                </p>

              )}

            </div>

          </div>

          {/* ================= FOOTER SECTION START ================= */}
                    <div className="mt-10 border-t pt-8">

            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Package Information
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

              <InfoCard
                title="Status"
                value={data.status}
                icon={<BadgeCheck size={18} />}
              />

              <InfoCard
                title="Featured"
                value={data.isFeatured ? "Yes" : "No"}
                icon={<Star size={18} />}
              />

              <InfoCard
                title="Created At"
                value={
                  data.createdAt
                    ? new Date(data.createdAt).toLocaleString()
                    : "-"
                }
                icon={<Calendar size={18} />}
              />

              <InfoCard
                title="Updated At"
                value={
                  data.updatedAt
                    ? new Date(data.updatedAt).toLocaleString()
                    : "-"
                }
                icon={<Calendar size={18} />}
              />

            </div>

          </div>

          {/* ================= ACTION BUTTON ================= */}

          <div className="flex justify-end mt-10 border-t pt-6">

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-900 text-white hover:bg-black transition font-medium"
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PackageViewModal;