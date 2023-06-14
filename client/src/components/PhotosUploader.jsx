import { useState } from "react";
import axios from "axios";
const PhotosUploader = ({addedPhotos, onChange}) => {
  const [photoLink, setPhotoLink] = useState("");

    const addPhotByLink = async (e) => {
      e.preventDefault();
      const { data: fileName } = await axios.post("/upload-by-link", {
        link: photoLink,
      });
      onChange((prev) => {
        return [...prev, fileName];
      });
      setPhotoLink("");
    };

    const uploadPhoto = async (e) => {
      e.preventDefault();

      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((respone) => {
          const { data: filenames } = respone;
          onChange((prev) => {
            return [...prev, ...filenames];
          });
        });
    };
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link ..jpg"
        />
        <button
          className="bg-gray-200 grow px-4 rounded-2xl"
          onClick={addPhotByLink}
        >
          Add&nbsp;Photo
        </button>
      </div>
      <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((key, link) => (
            <div key={key} className="h-32 flex w-full object-cover">
              <img
                className="rounded-2xl"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
        <label className="h-32 flex cursor-pointer items-center justify-center gap-1 border bg-transparent rounded-xl p-2 text-xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}

export default PhotosUploader