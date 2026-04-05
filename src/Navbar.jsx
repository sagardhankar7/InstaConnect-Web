import React from "react";
import { useDispatch, useSelector } from "react-redux";
import store from "./app/store";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./features/user";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          InstaConnect
        </Link>
      </div>
      <div className="flex gap-2">
        <div>{user ? user.firstName : ""}</div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  user
                    ? user.photoUrl
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4KeDUyV1rxmFscg52uRZsEqG5KHfAYAq52ImBp-27NErWMeedHBKbFciA&s"
                }
              />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/profile/edit">
                Edit Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <Link to="/connections">
                Connections
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
