import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getNavs } from "../navigation";
import { getOrderCount } from "../util/statusColor";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const [allNav, setAllNav] = useState([]);
  const { pathname } = useLocation();
  const [expandedMenu, setExpandedMenu] = useState(null);

  const { allOrder, totalDF } = useSelector((state) => state.filter);

  useEffect(() => {
    const navs = getNavs();
    setAllNav(navs);
  }, []);

  const showHide = () => {
    setShowSidebar(false);
    setExpandedMenu(null);
  };

  const toggleSubMenu = (id) => {
    setExpandedMenu(expandedMenu === id ? null : id);
  };

  return (
    <div>
      {/* overlay */}
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#39444e80] top-0 left-0 z-50`}
      ></div>
      {/* side bar */}
      <div
        className={`w-[260px] fixed bg-white z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${
          showSidebar ? "left-0" : "-left-[260px] lg:left-0"
        }`}
      >
        {/* shop logo */}
        <div className="h-[70px] flex justify-center items-center">
          <Link to="/" className="w-[180px] h-[50px]">
            <img
              className="w-full h-full"
              src="/images/logo.png"
              alt="shop logo"
            />
          </Link>
        </div>
        <div>
          {/* all nav item */}
          <ul>
            {allNav?.map((nav) => (
              <li key={nav.id}>
                <Link
                  onClick={() =>
                    nav.children ? toggleSubMenu(nav.id) : showHide()
                  }
                  to={nav.path}
                  className={`cursor-pointer ${
                    pathname === nav.path
                      ? "bg-teal-50 text-teal-500 duration-500"
                      : "text-[#525252] duration-200"
                  } px-[25px] py-[10px] rounded-sm flex justify-between items-center gap-[12px] hover:pl-8 transition-all w-full mb-1 text-[18px] hover:bg-teal-50 hover:text-teal-500 font-poppin`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[22px]">{<nav.icon />}</span>
                    <span>{nav.title}</span>
                  </span>
                  <span
                    className={`transition-transform duration-300 ${
                      expandedMenu === nav.id ? "rotate-180" : ""
                    }`}
                  >
                    {nav.children && <IoIosArrowDown />}
                  </span>
                </Link>
                {nav.children && (
                  <ul
                    className={`pl-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
                      expandedMenu === nav.id ? "max-h-[1000px]" : "max-h-0"
                    }`}
                  >
                    {nav.children.map((child) => (
                      <li key={child.id}>
                        <Link
                          onClick={() => setShowSidebar(false)}
                          to={child.path}
                          className={`${
                            pathname === child.path
                              ? "bg-teal-50 text-teal-500"
                              : "text-[#525252]"
                          } px-[25px] py-[10px] rounded-sm flex justify-start items-center gap-[12px] transition-all w-full mb-1 text-[16px] hover:bg-teal-50 hover:text-teal-500 font-poppin`}
                        >
                          <div className="flex items-center w-full justify-between gap-1">
                            <span className="flex items-center gap-1">
                              <GoDotFill />
                              <span>{child.title}</span>
                            </span>

                            {
                              <span className="bg-teal-100 rounded-full p-[2px] min-h-[20px] min-w-[20px] text-center text-teal-500 text-[12px]">
                                {getOrderCount(child.title, allOrder, totalDF)}
                              </span>
                            }
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
