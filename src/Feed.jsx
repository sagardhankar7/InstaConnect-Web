import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "./utils/constants";
import User from "./User";
import { useSelector } from "react-redux";

const Feed = () => {
  const [data, setData] = useState([]);
  const [adminConnections, setAdminConnections] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const role = useSelector((store) => store.role);
  const [activeTab, setActiveTab] = useState("connections");

  const handleFeed = async () => {
    const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
    setData(res.data);
  };

  const handleAdminConnections = async () => {
    const res = await axios.get(BASE_URL + "/admin/AllConnections", {
      withCredentials: true,
    });
    setAdminConnections(res.data.data);
  };

  const handleAdminUsers = async () => {
    const res = await axios.get(BASE_URL + "/admin/getAll", {
      withCredentials: true,
    });
    setAdminUsers(res.data.data);
  };

  const [search, setSearch] = useState("");
  const [searchConn, setSearchConn] = useState("");
  const filteredUsers = adminUsers.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const email = user.email?.toLowerCase() || "";
    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  const filteredAdminConnections = adminConnections.filter((conn) => {
    const fromEmail = conn.fromUserId?.email?.toLowerCase() || "";
    const toEmail = conn.toUserId?.email?.toLowerCase() || "";
    return (
      fromEmail.includes(searchConn.toLowerCase()) ||
      toEmail.includes(searchConn.toLowerCase())
    );
  });

  const [selectedConnections, setSelectedConnections] = useState([]);
  const toggleConnectionSelection = (connectionId) => {
    setSelectedConnections((previousSelected) => {
      if (previousSelected.includes(connectionId))
        previousSelected = previousSelected.filter((id) => id != connectionId);
      return [...previousSelected, connectionId];
    });
  };
  const handleAdminModifyConnection = async () => {
    console.log(selectedConnections);
    try {
      const res = await axios.post(
        BASE_URL + "/admin/modifyConnectionToAccepted/",
        { connectionIds: selectedConnections },
        { withCredentials: true },
      );
      console.log(res.data);
      // Optionally, you can refresh the connections list after modification
      handleAdminConnections();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (role == "default") handleFeed();
    if (role == "admin") handleAdminConnections();
    if (role == "admin") handleAdminUsers();
  }, [role]);

  return (
    <div>
      {role === "admin" && (
        <div role="tablist" className="tabs tabs-lift">
          <a
            role="tab"
            className={"tab" + (activeTab == "users" ? " tab-active" : "")}
            onClick={() => setActiveTab("users")}
          >
            Users
          </a>
          <a
            role="tab"
            className={
              "tab" + (activeTab == "connections" ? " tab-active" : "")
            }
            onClick={() => setActiveTab("connections")}
          >
            Connections
          </a>
        </div>
      )}

      {role === "admin" && activeTab === "users" && (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>
                  Name
                  <br />
                  <input
                    type="text"
                    placeholder="Search name..."
                    className="input input-sm input-bordered mt-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
                <th>Skills</th>
                <th>No. of Active Strikes</th>
                <th>
                  Email
                  <br />
                  <input
                    type="text"
                    placeholder="Search Email"
                    className="input input-sm input-bordered mt-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {adminUsers &&
                filteredUsers.map((user, index) => (
                  <tr>
                    <th>{index}</th>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.skills?.join(", ") || "N/A"}</td>
                    <td>{user.strikes || 0}</td>
                    <td>{user.email || ""}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {role === "admin" && activeTab === "connections" && (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>From</th>
                <th>To</th>
                <th>Status of connection</th>
                <th>
                  <button
                    onClick={() => handleAdminModifyConnection()}
                    className="btn btn-soft btn-primary"
                  >
                    Change to Accepted
                  </button>
                </th>
              </tr>
              <tr>
                <th></th>
                <th colSpan="2">
                  <input
                    type="text"
                    placeholder="Type Email"
                    className="input input-sm input-bordered mt-1"
                    value={searchConn}
                    onChange={(e) => setSearchConn(e.target.value)}
                  />
                </th>

                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {adminConnections &&
                filteredAdminConnections.map((conn, index) => (
                  <tr>
                    <th>{index}</th>
                    <td>{conn.fromUserId?.email}</td>
                    <td>{conn.toUserId?.email}</td>
                    <td>{conn.status}</td>
                    <td>
                      <input
                        onChange={() => toggleConnectionSelection(conn._id)}
                        type="checkbox"
                      ></input>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center mt-10">
        {role === "default" && (
          <div className="carousel rounded-box w-120">
            {data.map((user) => (
              <div
                className="carousel-item w-full flex justify-center"
                key={user._id}
              >
                <User user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
