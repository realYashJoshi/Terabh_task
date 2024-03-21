import React from 'react';

const ViewerProfile = ({ user }) => {
  return (
    <div className="container mt-4">
      <div className="card ">
        <div className="card-header bg-success" >
          <h2 className="card-title" color='white'>Viewer Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {user._id}</p>
          <p className="card-text">Email: {user.email}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ViewerProfile;

