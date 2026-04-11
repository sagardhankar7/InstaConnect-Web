import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useState } from "react";

// used in profileEdit,
const User = ({ user }) => {
  const s = user.skills;
  const skillsArray = Array.isArray(s)
    ? s
    : s?.split(",").map((skill) => skill.trim());

  const [acknoledgeInterested, setAcknoledgeInterested] = useState(false);
  const [acknoledgeIgnored, setAcknoledgeIgnored] = useState(false);
  const dataCall = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true },
      );
      if (res?.data?.data?.status == "interested")
        setAcknoledgeInterested(true);
      if (res?.data?.data?.status == "ignored") setAcknoledgeIgnored(true);

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-200 w-full max-w-120 shadow-sm mx-1">
      <figure className="px-10 pt-10">
        <img src={user.photoUrl || null} alt="user" className="rounded-xl" />
      </figure>

      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>

        {skillsArray?.length > 0 && (
          <div className="uppercase font-semibold shadow-lg rounded p-5">
            {skillsArray?.join(", ")}
          </div>
        )}
        <p>{user.about}</p>
        <div className="card-actions">
          {acknoledgeIgnored ? (
            <button className="btn btn-disabled">
              <span className="group-hover:hidden">Ignored</span>
              <span className="hidden group-hover:inline">Undo</span>
            </button>
          ) : (
            <button
              className="btn btn-secondary"
              onClick={() => dataCall("ignored", user._id)}
            >
              Ignore
            </button>
          )}

          {acknoledgeInterested ? (
            <button className="btn btn-success">Sent Successfully</button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => dataCall("interested", user._id)}
            >
              Interested
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
