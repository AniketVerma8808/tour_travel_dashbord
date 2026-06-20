import React from 'react'

const GeneralSection = ({ isEditing, setIsEditing, fetchSettings, saving, }) => {
    return (
        <>
        <div className='settings-section'>
       <div className="table-card p-6  ">

            <div className="flex items-center justify-between ">

                <div>
                    <h1 className="page-title">
                        Website Settings
                    </h1>

                    <p className="page-subtitle">
                        Manage website information
                    </p>
                </div>

                {!isEditing ? (
                    <button
                        type="button"
                        onClick={() =>
                            setIsEditing(true)
                        }
                        className="btn-primary"
                    >
                        Edit Settings
                    </button>
                ) : (
                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                fetchSettings();
                            }}
                            className="btn-outline"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="btn-primary"
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>
                )}

            </div>
            </div>
            </div>
        </>
    )
}

export default GeneralSection