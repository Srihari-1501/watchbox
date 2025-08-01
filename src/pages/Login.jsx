import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Uncomment if you plan to use axios for API calls

function Login() {

  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); 

    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      alert("Login Successful");
      console.log("User Data", res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }

  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse border-2 border-red-300 rounded-lg shadow-lg p-10 gap-10">
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Login now to access your personalized movie dashboard. Save your
            favorites, track what you've watched, and discover trending films
            tailored just for you. Your next movie night starts here!
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} method="post">
              <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="Email" onChange={handleChange} className="input input-bordered" />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="password" onChange={handleChange} placeholder="Password" className="input input-bordered" />
            </div>

            <div className="form-control mb-2">
              <Link to="/signup" className="link link-hover text-sm text-center">
                Don't have an account? Sign Up
              </Link>
            </div>

            <button type="submit" className="btn btn-neutral mt-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
