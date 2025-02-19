import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./login";

function Navbar() {

  const [openSignup,setOpenSignup]=useState(false)

  const [openLogin, setOpenLogin]=useState(false)


  return (
    <>
      <div className="navbar bg-base-100 md:w-full sm:flex p-4 bg-slate-500">
        <div className="flex-1">
          <a className="btn btn-ghost text-2xl font-bold hover:cursor-pointer">E-learn</a>
        </div>

        {/* Desktop Menu (Visible on md+ screens) */}
        <div className="hidden md:flex flex-none">
          <ul className="menu menu-horizontal px-1 pr-4 flex space-x-1">
            <li>
              <button onClick={()=>setOpenLogin(true)}  className="pl-6 pr-6 pt-2 pb-2 bg-slate-900 hover:bg-pink-600 rounded-xl font-semibold text-white">
                Login
              </button>
            </li>
            <li>
              <button onClick={()=>setOpenSignup(true)} className="pl-6 pr-6 pt-2 pb-2 bg-slate-900 hover:bg-pink-600 rounded-xl font-semibold text-white">
                Signup
              </button>
            </li>
          </ul>
        </div>

        <Signup openSignup={openSignup} setOpenSignup={setOpenSignup}  />
       <Login openLogin={openLogin} setOpenLogin={setOpenLogin}/>

        {/* Mobile Menu (Visible only on small screens) */}
        <div className="md:hidden">
          <details className="dropdown">
            <summary className="btn btn-ghost">Menu</summary>
            <ul className="dropdown-content bg-base-100 rounded-t-none p-2 w-40 shadow-md">
              <li>
                <a>Login</a>
              </li>
              <li>
                <a>Signup</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}

export default Navbar;
