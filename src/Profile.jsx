import React from "react";
import { useSelector } from "react-redux";
import store from "./app/store";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img src={user.photoUrl} alt="Profile photo" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
          <p>{user.about}</p>
          <p>{user.skills}</p>
          <p>{user.email}</p>
          <div className="card-actions justify-end">
            {/* <button className="btn btn-primary"></button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
