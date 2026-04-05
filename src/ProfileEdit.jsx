import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { addUser } from "./features/user";
import axios from "axios";

const ProfileEdit = () => {
  const user = useSelector((store) => store.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const dispatch = useDispatch();
  const handleSave = async () => {
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        about,
        photoUrl,
      },
      { withCredentials: true },
    );
    dispatch(addUser(res.data));
    console.log(res);
  };

  return (
    <div className="flex justify-center">
      <div className="card card-border border-4 bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              type="text"
              className="input"
            />
          </fieldset>

          <div className="card-actions justify-center">
            <button
              onClick={() => {
                handleSave();
              }}
              className="btn btn-primary"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
