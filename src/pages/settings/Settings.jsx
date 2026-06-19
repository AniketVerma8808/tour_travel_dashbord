const Settings = () => {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Website Settings
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Company Name"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Phone"
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="WhatsApp"
            className="border rounded-lg p-3"
          />

        </div>

      </div>

    </div>
  );
};

export default Settings;