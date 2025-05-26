import React, { useState, useEffect } from "react";
import "./UserDetails.css";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetails = ({ url }) => {
  const [details, setDetails] = useState([]);

  const fetchUser = async () => {
    const response = await axios.get(`${url}/api/user/list`);
    if (response.data.success) {
      setDetails(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="add">
      <p className="heading">All User List</p>
      <div className="userdetails">
        <div className="userdetails-format user-title">
          <b>Name</b>
          <b>Email</b>
          <b>User Feedback</b>
        </div>
        {details.map((user, index) => {
          return (
            <div key={index} className="userdetails-format">
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.feedback}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDetails;
