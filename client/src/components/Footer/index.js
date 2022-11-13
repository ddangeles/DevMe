import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <br/>
        <br/>
        <Typography sx={{color: '#e6e9ec', background:'#052541', border:'0px', fontSize:'12px'}}>&copy; {new Date().getFullYear()} - |)evMe</Typography>
      </div>
    </footer>
  );
};

export default Footer;
