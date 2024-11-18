import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebaseConfig";

const UploadImage = ({ setFormData, formData }) => {
  const [images, setImages] = useState([]);
  const [progressList, setProgressList] = useState({});
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const storage = getStorage(app);

  const handleChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith("image/"));

    if (validFiles.length === 0) {
      setError("Please select valid image files.");
      setImages([]);
      return;
    }

    setImages(validFiles);
    setError(null); // Clear previous errors
  };

  const handleUpload = () => {
    if (images.length === 0) {
      setError("No images selected for upload.");
      return;
    }

    setIsUploading(true);
    const newProgressList = {};

    // Array to hold the image URLs
    const uploadedUrls = [];

    const uploadPromises = images.map((image) => {
      const storageRef = ref(storage, `cars/${image.name}`); // Reference to storage location
      const uploadTask = uploadBytesResumable(storageRef, image); // Start uploading

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Update progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressList((prev) => ({ ...prev, [image.name]: progress }));
          },
          (error) => {
            // Handle upload error
            console.error("Upload Error:", error);
            setError("Error uploading image.");
            reject(error);
          },
          async () => {
            // On successful upload, get download URL
            try {
              const url = await getDownloadURL(storageRef);
              uploadedUrls.push(url); // Push URL into the array

              resolve(url);
            } catch (err) {
              console.error("Error getting URL:", err);
              setError("Error fetching image URL.");
              reject(err);
            }
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then(() => {
        // Once all uploads are complete, update the form data with the image URLs
        setFormData({
          ...formData,
          images: uploadedUrls, // Set the URLs directly here after all uploads
        });
        console.log("All files uploaded successfully.");
      })
      .catch(() => {
        console.error("One or more uploads failed.");
      })
      .finally(() => {
        setIsUploading(false);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input type="file" multiple onChange={handleChange} accept="image/*" />
      <button
        onClick={handleUpload}
        disabled={images.length === 0 || isUploading}
      >
        {isUploading ? "Uploading..." : "Upload"}
      </button>

      {Object.keys(progressList).length > 0 && (
        <div>
          <h3>Upload Progress:</h3>
          <ul>
            {Object.entries(progressList).map(([name, progress]) => (
              <li key={name}>
                {name}: {Math.round(progress)}%
              </li>
            ))}
          </ul>
        </div>
      )}

      {formData.images && formData.images.length > 0 && (
        <div>
          <h3>Uploaded Images:</h3>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            {formData.images.map((url, index) => (
              <image
                key={index}
                src={url}
                alt={`Uploaded ${index + 1}`}
                style={{ width: "200px", marginTop: "10px" }}
              />
            ))}
          </div>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImage;
