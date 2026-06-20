import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getSettingsService,
  updateSettingsService,
} from "../../services/setting.service";
import BrandingSection from "../../components/settings/BrandingSection";
import GeneralSection from "../../components/settings/GeneralSection";
import CompanySection from "../../components/settings/CompanySection";
import SocialSection from "../../components/settings/SocialSection";
import SEOSection from "../../components/settings/SEOSection";
import ContentSection from "../../components/settings/ContentSection";

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    companyName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    logo: "",
    favicon: "",
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: "",
    footerText: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    officeTiming: "",
    mapEmbedUrl: "",
    status: "active",
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await getSettingsService();

      if (res.data?.success) {
        const settings =
          res.data.settings || {};

        setForm({
          companyName:
            settings.companyName || "",
          phone:
            settings.phone || "",
          whatsapp:
            settings.whatsapp || "",
          email:
            settings.email || "",
          address:
            settings.address || "",
          logo:
            settings.logo || "",
          favicon:
            settings.favicon || "",
          facebook:
            settings.facebook || "",
          instagram:
            settings.instagram || "",
          youtube:
            settings.youtube || "",
          twitter:
            settings.twitter || "",
          footerText:
            settings.footerText || "",
          metaTitle:
            settings.metaTitle || "",
          metaDescription:
            settings.metaDescription || "",
          metaKeywords:
            settings.metaKeywords?.join(", ") ||
            "",
          officeTiming:
            settings.officeTiming || "",
          mapEmbedUrl:
            settings.mapEmbedUrl || "",
          status:
            settings.status || "active",
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateSettingsService({
        ...form,
        metaKeywords:
          form.metaKeywords
            .split(",")
            .map((item) =>
              item.trim()
            )
            .filter(Boolean),
      });
      setIsEditing(false);
      toast.success("Settings updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="table-card p-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-52 mb-6"></div>

          <div className="grid md:grid-cols-2 gap-4">
            {[...Array(12)].map(
              (_, i) => (
                <div
                  key={i}
                  className="h-12 bg-gray-200 rounded"
                />
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <GeneralSection
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fetchSettings={fetchSettings}
        saving={saving}
      />

      <form
        onSubmit={handleSubmit}
      >

        <BrandingSection
          form={form}
          setForm={setForm}
          isEditing={isEditing}
        />

        <CompanySection
          form={form}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        <SocialSection
          form={form}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        <SEOSection
          form={form}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        <ContentSection
          form={form}
          handleChange={handleChange}
          isEditing={isEditing}
        />

        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Settings"}
            </button>
          </div>
        )}

      </form>
    </div>
  );
};

export default Settings;