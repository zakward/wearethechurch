import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, email, password);
    navigate('/');
  };

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header */}
      <section className="text-center bg-gradient-to-r from-secondaryPurple to-secondaryPink rounded-3xl shadow-xl p-6 md:p-8 border-4 border-white overflow-hidden">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-md">Join the Fun! 🎉</h1>
        <p className="text-lg md:text-xl text-white/90 mt-2">Sign up for your Bible study journey.</p>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-bgLightYellow to-bgLightGreen rounded-3xl shadow-xl p-6 md:p-8 lg:p-10 border-4 border-white space-y-6 overflow-hidden">
        <div>
          <label htmlFor="name" className="block text-sm md:text-base font-medium text-textGray mb-2">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-4 md:py-5 rounded-2xl border-2 border-secondaryPurple focus:outline-none focus:ring-4 focus:ring-secondaryPurple/50 transition-all duration-300 text-base md:text-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm md:text-base font-medium text-textGray mb-2">Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 md:py-5 rounded-2xl border-2 border-secondaryPurple focus:outline-none focus:ring-4 focus:ring-secondaryPurple/50 transition-all duration-300 text-base md:text-lg"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm md:text-base font-medium text-textGray mb-2">Password</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-4 md:py-5 rounded-2xl border-2 border-secondaryPurple focus:outline-none focus:ring-4 focus:ring-secondaryPurple/50 transition-all duration-300 text-base md:text-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-secondaryOrange to-secondaryPink hover:from-secondaryPink hover:to-secondaryOrange text-textGray font-bold py-3 px-6 md:py-4 md:px-8 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-rotate-2 border-4 border-white text-base md:text-lg lg:text-xl"
        >
          Sign Up 🚀
        </button>
      </form>

      <p className="text-center text-base md:text-lg">Already joined? <Link to="/login" className="text-secondaryPurple hover:underline font-bold">Log in</Link></p>

     
    </div>
  );
};

export default Signup;