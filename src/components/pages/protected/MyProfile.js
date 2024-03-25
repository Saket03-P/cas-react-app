import React, { useEffect, useState } from 'react'
import { auth, db } from '../../configs/firebase'
import { useSelector } from 'react-redux'

const MyProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const authUser = useSelector(state => state.authRed.user);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authUser) {
        // Fetch user details from Firestore
        const userDocRef = db.collection('users').doc(authUser.uid);
        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
          setUserDetails(userDoc.data());
        } else {
          console.log('User document does not exist');
        }
      }
    };

    fetchUserDetails();
  }, [authUser]);

  return (
    <div>
      <h2>My Profile</h2>
      {userDetails ? (
        <div>
          <p><strong>Name:</strong> {userDetails.displayName}</p>
          <p><strong>Email:</strong> {authUser.email}</p>
          <p><strong>DOB:</strong> {userDetails.dob}</p>
          <p><strong>Address:</strong> {userDetails.address}</p>

          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default MyProfile