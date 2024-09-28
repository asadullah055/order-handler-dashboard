import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { seller_logout } from "../features/auth/authSlice";

const Header = ({ showSidebar, setShowSidebar }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handelLogout = () => {
    dispatch(seller_logout(""));
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 w-full z-40 shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] ">
      <div className="ml-0 lg:ml-[250px] rounded-md h-[65px] flex justify-between items-center bg-white pl-6 lg:pr-12 transition-all">
        {/* hamburger menu */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm  justify-center items-center cursor-pointer "
        >
          <span className="text-[25px] text-teal-500">
            <GiHamburgerMenu />
          </span>
        </div>
        <div className="flex justify-end w-full items-center lg:gap-3">
          <div className="text-[25px] lg:p-3 md:p-2 p-1 ">
            <IoMdNotificationsOutline />
          </div>
          {/* <div className="text-[25px] lg:p-3 md:p-2 p-1 ">
            <MdOutlineEmail />
          </div> */}
          <Link
            to="/profile"
            className="p-2 flex justify-between items-center lg:gap-3 gap-1
            cursor-pointer hover:border-teal-100 border border-transparent
            rounded-full hover:bg-gray-100 transition-all duration-300 group"
          >
            <h2 className="text-[14px] font-medium text-[#525252] flex items-center">
              {/* <span className="text-black">
                <IoMdArrowDropdown />
              </span> */}
              <span className="group-hover:text-teal-500 duration-300">
                {userInfo?.name}
              </span>
            </h2>
            <img
              className="h-9 w-9 rounded-full"
              src="/images/user.png"
              alt="title"
            />
          </Link>
          <button onClick={handelLogout} className="bg-teal-50 p-2 rounded-md">
            <RiLogoutCircleLine className="font-bold text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
