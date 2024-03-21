
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const ViewerProfile = ({ user }) => {
//   const [ads, setAds] = useState([]);

//   useEffect(() => {
//     // Fetch ads targeted towards the viewer
//     const fetchAds = async () => {
//       try {
//         // Retrieve JWT token from cookie
//         const token = Cookies.get('token');

//         // Check if token exists
//         if (!token) {
//           // Redirect or show error message indicating unauthenticated user
//           return;
//         }

//         // Set authorization header with JWT token
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         };

//         // Fetch ads targeted towards the viewer
//         const res = await axios.get('http://localhost:5000/api/ad', config);
//         setAds(res.data);
//       } catch (error) {
//         console.error(error);
//         // Handle unauthorized or other errors
//       }
//     };

//     fetchAds();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <div className="card">
//         <div className="card-header bg-success">
//           <h2 className="card-title">Viewer Profile</h2>
//         </div>
//         <div className="card-body">
//           <p className="card-text">ID: {user._id}</p>
//           <p className="card-text">Email: {user.email}</p>
//           <h3>Ads targeted towards you:</h3>
//           <ul>
//             {ads.map(ad => (
//               <li key={ad._id}>{ad.content}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewerProfile;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ViewerProfile = ({ user }) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = Cookies.get('token');
        if (!token) {
          // Handle unauthenticated user
          return;
        }
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const res = await axios.get('http://localhost:5000/api/ad', config);
        setAds(res.data);
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    };

    fetchAds();
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success">
          <h2 className="card-title">Viewer Profile</h2>
        </div>
        <div className="card-body">
          <p className="card-text">ID: {user._id}</p>
          <p className="card-text">Email: {user.email}</p>
          <h3>Ads targeted towards you:</h3>
          <div className="list-group">
            {ads.map(ad => (
              <div key={ad._id} className="list-group-item">
                
                <p className="mb-1">{ad.content}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerProfile;

