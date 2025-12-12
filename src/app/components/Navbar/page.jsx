"use client";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";

const NavbarPage = () => {
  const {user} = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <div className="navbar bg-gradient-to-r from-green-100 to-green-200 shadow-lg sticky top-0 z-50 px-6">

      {/* Start */}
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost normal-case text-2xl text-green-800 font-extrabold flex items-center gap-2"
        >
          <img
            src="https://i.ibb.co.com/205rP86J/download-1.jpg"
            className="w-10 h-10 rounded-full"
          />
          Foodie
        </Link>
      </div>

      {/* Center Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-green-800 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/menu">Menu</Link></li>
          <li><Link href="/AddFood">Add Food</Link></li>
          <li><Link href="/AllFood">All Food</Link></li>
          <li><Link href="/AboutUs">About Us</Link></li>
          <li><Link href="/ManageFood">Manage Food</Link></li>
        </ul>
      </div>

      {/* End: User Login Status */}
      <div className="navbar-end">

        {!user && (
          <Link
            href="/login"
            className="btn bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Login
          </Link>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-green-50 rounded-box w-52"
            >
              <li><span className="font-bold text-green-800">{user?.displayName}</span></li>
              <li><Link href="/profile">My Profile</Link></li>

              {/* Food Related dropdown */}
              <li><Link href="/AddFood">Add Product</Link></li>
              <li><Link href="/AllFood">All Food</Link></li>
              <li><Link href="/AboutUs">About Us</Link></li>
              <li><Link href="/ManageFood">Manage Food</Link></li>

              <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default NavbarPage;
