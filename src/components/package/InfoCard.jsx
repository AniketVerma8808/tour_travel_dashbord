import React from "react";

const InfoCard = ({
  title,
  value,
  icon,
  className = "",
}) => {
  return (
    <div
      className={`
        bg-white
        border
        border-gray-200
        rounded-xl
        p-4
        shadow-sm
        hover:shadow-md
        transition-all
        duration-200
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            {icon}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-[15px] font-semibold text-gray-800 break-words">
            {value !== undefined &&
            value !== null &&
            value !== ""
              ? value
              : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;