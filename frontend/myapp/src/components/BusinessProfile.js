import React from 'react';

const BusinessProfile = ({ user }) => {
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning">
          <h2 className="card-title">Business Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {user._id}</p>
          <p className="card-text">Email: {user.email}</p>
          
        </div>
      </div>
    </div>
  );
};
export default BusinessProfile;