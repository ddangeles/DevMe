import React, { useState } from 'react';

import MenteeSignup from '../components/MenteeSignup';
import MentorSignup from "../components/MentorSignup";

const Signup = () => {
  const [isShown, setIsShown] = useState(false)
  const handleClick = event => {
    event.preventDefault()
    setIsShown(current => !current);
  }

  const [isShown2, setIsShown2] = useState(false)
  const handleClick2 = event => {
    event.preventDefault()
    setIsShown2(current => !current);
  }


  return (
    <div>
      <main className="flex-row justify-center mb-4">
        <div className="col-6 col-lg-5">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2 text-center"><button onClick={handleClick} id="button-mentor">Mentor</button></h4>
            
          </div>
        </div>

        <div className="col-6 col-lg-5">
          <div className="card">
            <h4 className="card-header bg-dark text-light p-2 text-center"><button onClick={handleClick2} id="button-mentee">Mentee</button></h4>
           
          </div>
        </div>
      </main>

      <main className="flex-row justify-center mb-4">
        <div className="col-12 col-lg-10">
            {isShown && (
              <MentorSignup />
            )}

            {isShown2 && (
              <MenteeSignup />
            )}
        </div>
      </main>
    </div>

  );
};

export default Signup;
