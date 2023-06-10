import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import Perks from "./Perks";
import axios from "axios";

const Places = () => {
    const { action } = useParams()

    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState('')
    const [photoLink, setPhotoLink] = useState('')
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState('')
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)

    const inputHeader = (text) => {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }

    const inputDescription = (text) => {
      return <p className="text-gray-500 text-sm">{text}</p>;
    };

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    const addPhotByLink = async (e) => {
        e.preventDefault()
        const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
        console.log(fileName);
        setAddedPhotos(prev => {
            return [...prev, fileName]
        })
        setPhotoLink('')
    }
    return (
      <div>
        {action !== "new" && (
          <div className="text-center">
            <Link
              className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
              to={"/account/places/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new place
            </Link>
          </div>
        )}
        {action === "new" && (
          <div>
            <form>
              {preInput(
                "Title",
                "Title for your place, should be short and catchy as in the advertisement"
              )}
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="title, for example: My lovely apartment"
              />

              {preInput("Address", "Address to this place")}
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              {preInput("Photos", "Moret the merrier")}
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
                            {addedPhotos.length > 0 && addedPhotos.map((key, link) => (
                                <div>
                                    <img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} alt="" />                        
                                </div>
                            ))}
                            <button className="flex items-center justify-center gap-1 border bg-transparent rounded-xl p-2 text-xl text-gray-600">
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
                </button>
              </div>
              {preInput("Description", "Description to this place")}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              {preInput("Perks", "Select all perks of this place")}
              <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks perks={perks} onChange={setPerks} />
              </div>

              {preInput("Extra Info", "House rules, etc.")}
              <textarea
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
              />

              {preInput(
                "Check In, Check Out, etc.",
                "Add check in and check out times and make sure there is enough time between two for cleaning"
              )}

              <div className="grid gap-2 sm:grid-cols-3">
                <div>
                  <h3 className="mt-2 -mb-1">Check In time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkIn}
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Check Out time</h3>
                  <input
                    type="text"
                    placeholder="14:00"
                    value={checkOut}
                    onChange={(e) => e.target.value}
                  />
                </div>
                <div>
                  <h3 className="mt-2 -mb-1">Max number of guests</h3>
                  <input
                    type="number"
                    placeholder={2}
                    value={maxGuests}
                    onChange={(e) => e.target.value}
                  />
                </div>
              </div>
              <div>
                <button className="primary my-4">Save</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
}

export default Places