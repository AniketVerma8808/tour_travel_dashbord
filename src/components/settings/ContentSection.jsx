const ContentSection = ({
  form,
  handleChange,
  isEditing,
}) => {
  return (
        <div className='settings-section'>
    
           <div className="table-card p-6 settings-section ">

      <h2 className="text-xl font-semibold text-gold mb-5">
        Content Settings
      </h2>

      <div className="space-y-4">

        <textarea
          rows="3"
          name="footerText"
          value={form.footerText}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Footer Text"
          className="form-control"
        />

        <textarea
          rows="4"
          name="mapEmbedUrl"
          value={form.mapEmbedUrl}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Google Map Embed URL"
          className="form-control"
        />

      </div>
    </div>
    </div>
  );
};

export default ContentSection;