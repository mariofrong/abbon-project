// components/ProfilePictureUpload.tsx
import { Popover } from "antd";
import React, { useState } from "react";

interface IProfilePictureUpload {
  initialPicture?: string;
  width?: string;
  height?: string;
}
const ProfilePictureUpload: React.FC<IProfilePictureUpload> = ({
  initialPicture,
  width = "150px",
  height = "150px",
}) => {
  const [preview, setPreview] = useState<string | null>(
    initialPicture ? initialPicture : null
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile)); // Create a preview URL for the selected file
    }
  };

  const handleRemove = () => {
    setPreview(null); // Clear the preview
  };

  const content = (
    <div className="cursor-pointer">
      <p>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label className="cursor-pointer" htmlFor="file-upload">
          Edit
        </label>
      </p>
      <p onClick={handleRemove}> Delete</p>
    </div>
  );

  return (
    <div style={{ textAlign: "center" }}>
      {preview ? (
        <div>
          <Popover content={content}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Profile Preview"
              style={{ width: width, height: height, borderRadius: "50%" }}
            />
          </Popover>
        </div>
      ) : (
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <div
              style={{
                width: width,
                height: height,
                borderRadius: "50%",
                border: "2px dashed #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            ></div>
          </label>
        </div>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
