import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

function SignUp() {

  const [form,setForm] = useState({name:"",email:"",password:""})

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup",form);
      alert("Signup Succesfull")
      console.log("User Data",res.data)

      localStorage.setItem("user",JSON.stringify(res.data.user))
      window.location.href = "/login"; // Redirect to login page after successful signup
      
    } catch (error) {
      console.log(error);
      alert("SignUp Failed")
    }
  }

  function handleChange (e) {
    setForm({...form,[e.target.name]:e.target.value})
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse border-2 border-red-300 rounded-lg shadow-lg p-10 gap-10">
        <div className="text-center lg:text-left max-w-2xl">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6">
            Create your account to start building your ultimate movie
            collection. Save your favorite films, rate what you watch, and get
            personalized recommendations — all in one place!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} method="post">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input name="name" type="text" onChange={handleChange} className="input" autoComplete="Name" placeholder="Your name" />
                <label className="label">Email</label>
                <input name="email" onChange={handleChange} type="email" autoComplete="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  autoComplete="new-password" 
                  name="password"
                  onChange={handleChange}
                />
                <Link to="/login" className="link link-hover">
                  Already have an account? Login
                </Link>
                <button type="submit" className="btn btn-neutral mt-4">Sign Up</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
