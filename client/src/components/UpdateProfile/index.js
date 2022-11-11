// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

// import { EDIT_PROFILE } from '../../utils/mutations';

// import Auth from '../../utils/auth';

// import AddCircleIcon from '@mui/icons-material/AddCircle';

// const UpdateProfile = ({ profileId }) => {
//     const [education, setEducation] = useState('');
//     const [name, setName] = useState('');
//     const [yearsExperience, setExperience] = useState('');
//     const [skill, setSkill] = useState('');
  
//     const [editProfile, { error }] = useMutation(EDIT_PROFILE);
  
//     const handleFormSubmit = async (event) => {
//       event.preventDefault();
  
//       try {
//         const data = await editProfile({
//           variables: { profileId, education },
//         });
  
//         setEducation('');
//       } catch (err) {
//         console.error(err);
//       }
  
//       try {
//         const data = await editProfile({
//           variables: { profileId, name },
//         });
  
//         setName('');
//       } catch (err) {
//         console.error(err);
//       }
  
//       try {
//         const data = await editProfile({
//           variables: { profileId, yearsExperience }
//         });
  
//         setExperience('');
//       } catch (err) {
//         console.error(err);
//       }

//       try {
//         const data = await editProfile({
//           variables: { profileId, skill },
//         });
  
//         setSkill('');
//       } catch (err) {
//         console.error(err);
//       }
//     };
  
//     return (
//       <div>
//         <h4>Edit Profile:</h4>
  
//         {Auth.loggedIn() ? (
//           <form
//             className="flex-row justify-center justify-space-between-md align-center"
//             onSubmit={handleFormSubmit}
//           >
//             <div className="col-12 col-lg-9">
//               <input
//                 placeholder="Education"
//                 value={education}
//                 className="form-input w-100"
//                 onChange={(event) => setEducation(event.target.value)}
//               />
//             </div>
  
//             <div className="col-12 col-lg-9">
//               <input
//                 placeholder="Name"
//                 value={name}
//                 className="form-input w-100"
//                 onChange={(event) => setName(event.target.value)}
//               />
//             </div>
  
//             <div className="col-12 col-lg-9">
//               <input
//                 placeholder="Years"
//                 value={yearsExperience}
//                 className="form-input w-100"
//                 onChange={(event) => setExperience(event.target.value)}
//               />
//             </div>
            
//             {/* <div className="col-12 col-lg-9">
//               <input
//                 placeholder="Skills"
//                 value={skill}
//                 className="form-input w-100"
//                 onChange={(event) => setSkill(event.target.value)}
//               />
//             </div> */}

//             <div className="col-12 col-lg-3">
//               <button className="btn btn-info btn-block py-3" type="submit">
//                 SAVE
//               </button>
//             </div>
//             {error && (
//               <div className="col-12 my-3 bg-danger text-white p-3">
//                 {error.message}
//               </div>
//             )}
//           </form>
//         ) : (
//           <p>
//             You need to be logged in to endorse skills. Please{' '}
//             <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
//           </p>
//         )}
//       </div>
//     );
//   };
  
//   export default UpdateProfile;
  