// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const BusinessProfile = ({ user }) => {
//   const [adContent, setAdContent] = useState('');
//   const [users, setUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);

//   useEffect(() => {
//     // Fetch list of all users from MongoDB
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/users');
//         setUsers(res.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Submit ad with selected users
//     try {
//       await axios.post('/api/business/create-ad', {
//         adContent,
//         targets: selectedUsers,
//       });
//       // Reset form fields
//       setAdContent('');
//       setSelectedUsers([]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header bg-warning">
//           <h2 className="card-title">Business Profile</h2>
//         </div>
//         <div className="card-body">
//           <p className="card-text">ID: {user._id}</p>
//           <p className="card-text">Email: {user.email}</p>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="adContent" className="form-label">Ad Content</label>
//               <input type="text" className="form-control" id="adContent" value={adContent} onChange={(e) => setAdContent(e.target.value)} />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="selectedUsers" className="form-label">Select Users</label>
//               <select multiple className="form-control" id="selectedUsers" value={selectedUsers} onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))}>
//                 {users.map(user => (
//                   <option key={user._id} value={user._id}>{user.email}</option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Create Ad</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BusinessProfile = ({ user }) => {
  const [adContent, setAdContent] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch list of all users from MongoDB
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users');
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (userId) => {
    const updatedSelectedUsers = selectedUsers.includes(userId)
      ? selectedUsers.filter(id => id !== userId)
      : [...selectedUsers, userId];
    setSelectedUsers(updatedSelectedUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit ad with selected users
    try {
      await axios.post('http://localhost:5000/api/business/create-ad', {
        adContent,
        targets: selectedUsers,
        createdBy: user._id, 
      });
      // Reset form fields
      setAdContent('');
      setSelectedUsers([]);
    } catch (error) {
      console.error(error);
    }
    console.log(selectedUsers);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning">
          <h2 className="card-title">Business Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {user._id}</p>
          <p className="card-text">Email: {user.email}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="adContent" className="form-label">Ad Content</label>
              <input type="text" className="form-control" id="adContent" value={adContent} onChange={(e) => setAdContent(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Select Users</label>
              {users.map(user => (
                <div key={user._id} className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={user._id}
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleUserSelect(user._id)}
                  />
                  <label className="form-check-label" htmlFor={user._id}>{user.email}</label>
                </div>
              ))}
            </div>
            <button type="submit" className="btn btn-primary">Create Ad</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
