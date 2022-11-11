// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useMutation } from '@apollo/client';
// import { useQuery } from '@apollo/client';

// import { EDIT_PROFILE } from '../../utils/mutations';
// import { QUERY_ME } from '../../utils/queries';

// import Auth from '../../utils/auth';

// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import Avatar from '../Avatar';

// const EditProfile = () => {

//     const [edit, setEdit] = useState('');

//     const [editProfile, { error }] = useMutation(EDIT_PROFILE);
  
//     const handleFormSubmit = async (event) => {
//       event.preventDefault();
  
//       try {
//         const data = await editProfile({
//           variables: { education, name, yearsExperience },
//         });
  
//         setEdit('');
//       } catch (err) {
//         console.error(err);
//       }
//     };
  
   

//     return (

//         // <Card sx={{ bgcolor: 'text.primary' }}>
//         //   <CardContent color="text.primary">
//         //     <Typography variant="h5" component="div" color="primary.main">
//         //       <Avatar

//         //         name={profile.name} />
//         //       {`${profile.name}`}
//         //     </Typography>
//         //     <Typography variant="body2" color="text.secondary">
//         //       {`${profile.membershipType}`}
//         //     </Typography>
//         //     <br/>
//         //     <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
//         //       Email: <TextField id="outlined-basic" label="update email" variant="filled" />
//         //     </Typography>
//         //     <br/>
            

//         //     <Typography variant="body2" color="text.secondary">
//         //       Education: <TextField id="outlined-basic" label="update education" variant="filled" />
//         //     </Typography>
//         //     <Typography variant="body2" color="text.secondary">
//         //       Year's Experience: <TextField id="outlined-basic" label="update years experience" variant="filled" />
//         //     </Typography>
//         //     <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
//         //       {`${profile.skills}`}
//         //     </Typography>
//         //   </CardContent>
//         //   <CardActions>
//         //     <Button size="small" onClick={handleSave}>SAVE</Button>
//         //   </CardActions>

//         // </Card>

//         <form
//         className="flex-row justify-center justify-space-between-md align-center"
//         onSubmit={handleFormSubmit}
//       >
//         <div className="col-12 col-lg-9">
//           <input
//             placeholder="Enter languages here..."
//             value={edit}
//             className="form-input w-100"
//             onChange={(event) => setEdit(event.target.value)}
//           />
//         </div>

//         <div className="col-12 col-lg-3">
//           <button className="btn btn-info btn-block py-3" type="submit">
//             Save
//           </button>
//         </div>
//         {error && (
//           <div className="col-12 my-3 bg-danger text-white p-3">
//             {error.message}
//           </div>
//         )}
//       </form>

//     );
// };


// export default EditProfile;
