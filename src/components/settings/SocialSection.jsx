const SocialSection = ({
    form,
    handleChange,
    isEditing,
}) => {
    return (
        <div className='settings-section'>

            <div className="table-card p-6 ">


                <h3 className="table-title mb-5">
                    Social Media Links
                </h3>

                <div className="grid md:grid-cols-2 gap-5">

                    <input
                        type="text"
                        name="facebook"
                        value={form.facebook}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Facebook URL"
                        className="form-control"
                    />

                    <input
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Instagram URL"
                        className="form-control"
                    />

                    <input
                        type="text"
                        name="youtube"
                        value={form.youtube}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="YouTube URL"
                        className="form-control"
                    />

                    <input
                        type="text"
                        name="twitter"
                        value={form.twitter}
                        onChange={handleChange}
                        disabled={!isEditing}
                        placeholder="Twitter URL"
                        className="form-control"
                    />

                </div>

            </div>

        </div>
    );
};

export default SocialSection;