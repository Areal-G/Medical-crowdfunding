import { useState } from "react";
import axios from "axios";

const useFileUploader = () => {
  const [files, setFiles] = useState([]);

  const handleFilesChange = (e) => {
    setFiles(e.target.files);
  };

  const uploadFiles = async () => {
    const uploadedImages = [];

    for (const file of files) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", "wfa0uwpk");

      // axios config
      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };

      const cloudinaryUrl =
        "https://api.cloudinary.com/v1_1/daecqeccw/image/upload";

      const res = await axios.post(cloudinaryUrl, formData, config);

      uploadedImages.push(res.data.secure_url);
    }

    return uploadedImages;
  };

  return { handleFilesChange, uploadFiles };
};

export default useFileUploader;
