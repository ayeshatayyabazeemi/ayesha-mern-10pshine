import { useState } from 'react';
import React from 'react';
import './SignUpForm.css';
import { motion } from 'framer-motion';
import { BsPerson, BsEnvelope, BsLock } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from "axios";
const SignUpForm = ({ toggleForm }) => {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [formdata,setformdata]=useState({
    username:"",
    email:"",
    password:"",
    c_password:"",

  });
  const handleSignup= async () => {
    if (!formdata.email || !formdata.password || !formdata.c_password || !formdata.username) {
  toast.error("Please fill in all fields");
  return;
}
        if (formdata.password !== formdata.c_password){
          toast.error("password donot match");
          return;
        }
        if (!emailRegex.test(formdata.email)) {
  toast.error("Invalid email format");
  return;
}

        try{
          const res= await axios.post('http://localhost:5000/api/auth/signup',{
            username: formdata.username,
            email: formdata.email,
            pwd: formdata.password,
          });
          toast.success("Signup successful!");
          setformdata({username:"",
    email:"",
    password:"",
    c_password:"",
});
          console.log(res.data);

        }catch(error){
           toast.error(" Signup failed: " + error.response?.data?.message || error.message);
          console.error(error);

        }

        }

  return (
    <motion.div
      className="form-wrapper align-items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="form sign-up">
        <div className="input-group">
          <BsPerson className="icon" />
          <input type="text" placeholder="Username" value={formdata.username} onChange={(e)=> setformdata({...formdata,username:e.target.value})}/>
        </div>
        <div className="input-group">
          <BsEnvelope className="icon" />
          <input type="email" placeholder="Email" value={formdata.email} onChange={(e=>setformdata({...formdata,email:e.target.value}))} />
        </div>
        <div className="input-group">
          <BsLock className="icon" />
          <input type="password" placeholder="Password" value={formdata.password} onChange={(e) => setformdata({ ...formdata, password: e.target.value })} />
        </div>
        <div className="input-group">
          <BsLock className="icon" />
          <input type="password" placeholder="Confirm Password" value={formdata.c_password} onChange={(e) => setformdata({ ...formdata, c_password: e.target.value })} />
        </div>
        
        <button onClick={handleSignup}>Sign up</button>
        <p>
          <span>Already have an account?</span>{' '}
          <b onClick={toggleForm} className="pointer">Sign in here</b>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpForm;
