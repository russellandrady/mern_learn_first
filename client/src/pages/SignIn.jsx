import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import { useDispatch,useSelector } from "react-redux";//to dispatch above line things. 
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formdata, setFormdata] = useState({});
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const {error,loading} = useSelector((state) => state.user);//we are using now useSelector to get the state from the store.Instead use usestate to get the state.
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    //async use here because we need to wait until the form fills
    e.preventDefault();
    try {
      dispatch(signInStart());//instead these dispatching, we earlier did like this "setLoading(true);setError(false);"
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await response.json();
      
      if(data.success===false){
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error)); //pass the error as the payload.
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          onChange={handleChange}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{error?error.message||"Something went wrong":''}</p>
    </div>
  );
}
