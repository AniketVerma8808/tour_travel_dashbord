const BrandingSection = ({ form, handleChange, isEditing, }) => {
  return (
        <div className='settings-section'>

    <div className="table-card p-6 ">

      <h2 className="table-title mb-5">
        Branding Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Logo */}
        <div className="border border-[var(--color-border)] rounded-[18px] p-5">

          <h3 className="font-semibold mb-4">
            Website Logo
          </h3>

          <div className="h-[120px] flex items-center justify-center border rounded-xl bg-gray-50 mb-4">

            {form.logo ? (
              <img
                src={form.logo}
                alt="Logo"
                className="max-h-[90px] object-contain"
              />
            ) : (
              <span className="text-gray-400">
                No Logo
              </span>
            )}

          </div>

          <input
            type="text"
            name="logo"
            value={form.logo}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Logo URL"
            className="form-control"
          />

        </div>

        {/* Favicon */}
        <div className="border border-[var(--color-border)] rounded-[18px] p-5">

          <h3 className="font-semibold mb-4">
            Website Favicon
          </h3>

          <div className="h-[120px] flex items-center justify-center border rounded-xl bg-gray-50 mb-4">

            {form.favicon ? (
              <img
                src={form.favicon}
                alt="Favicon"
                className="h-16 w-16 object-contain"
              />
            ) : (
              <span className="text-gray-400">
                No Favicon
              </span>
            )}

          </div>

          <input
            type="text"
            name="favicon"
            value={form.favicon}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Favicon URL"
            className="form-control"
          />

        </div>

      </div>

    </div>
    </div>
  );
};

export default BrandingSection;