const SEOSection = ({
  form,
  handleChange,
  isEditing,
}) => {
  return (
        <div className='settings-section'>

           <div className="table-card p-6">

      <h2 className="text-xl font-semibold text-gold mb-5">
        SEO Settings
      </h2>

      <div className="space-y-4">

        <textarea
          rows="2"
          name="metaTitle"
          value={form.metaTitle}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Meta Title"
          className="form-control"
        />

        <textarea
          rows="3"
          name="metaDescription"
          value={form.metaDescription}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="Meta Description"
          className="form-control"
        />

        <textarea
          rows="2"
          name="metaKeywords"
          value={form.metaKeywords}
          onChange={handleChange}
          disabled={!isEditing}
          placeholder="keyword1, keyword2, keyword3"
          className="form-control"
        />

      </div>
    </div>
    </div>
  );
};

export default SEOSection;