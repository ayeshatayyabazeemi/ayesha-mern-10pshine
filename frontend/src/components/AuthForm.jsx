import React, { useState } from 'react';
import './AuthForm.css'; // Your container and layout styles
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { motion } from 'framer-motion';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => setIsSignIn(!isSignIn);

  return (
    <div className={`container ${isSignIn ? 'sign-in' : 'sign-up'}`}>
      <motion.div className="row" layout>
        {/* SIGN UP COLUMN */}
        <div className="col align-items-center flex-col sign-up">
          { !isSignIn && <SignUpForm toggleForm={toggleForm} /> }
        </div>

        {/* SIGN IN COLUMN */}
        <div className="col align-items-center flex-col sign-in">
          { isSignIn && <SignInForm toggleForm={toggleForm} /> }
        </div>
      </motion.div>

      {/* CONTENT SECTION */}
      <div className="row content-row">
        {/* LEFT (Sign In Content) */}
        <div className="col align-items-center flex-col">
          <div className="text sign-in moveup">
  <h2>Welcome Back to NoteSpace</h2>
  <p>Securely manage your personal notes anytime, anywhere.</p>
</div>

          <div className="img sign-in">{/* Add image here if needed */}</div>
        </div>

        {/* RIGHT (Sign Up Content) */}
        <div className="col align-items-center flex-col">
          <div className="img sign-up">{/* Add image here if needed */}</div>
          <div className="text sign-up">
            <h2>Join with us</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
