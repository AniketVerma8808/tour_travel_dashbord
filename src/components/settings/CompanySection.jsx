const CompanySection = ({ form, handleChange, isEditing, }) => {
    return (
        <div className='settings-section'>

               <div className="table-card p-6 settings-section ">


            <h3 className="table-title mb-5">
                Company Information
            </h3>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="text"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Company Name"
                    className="form-control"
                />

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Phone"
                    className="form-control"
                />

                <input
                    type="text"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="WhatsApp"
                    className="form-control"
                />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Email"
                    className="form-control"
                />

                <input
                    type="text"
                    name="officeTiming"
                    value={form.officeTiming}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Office Timing"
                    className="form-control"
                />

                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="form-control"
                >
                    <option value="active">
                        Active
                    </option>

                    <option value="inactive">
                        Inactive
                    </option>
                </select>

            </div>

            <div className="mt-5">

                <textarea
                    rows="3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    placeholder="Address"
                    className="form-control"
                />

            </div>

        </div>
        </div>
    );
};

export default CompanySection;