import React, { useState } from "react";
import styles from "./SideMenu.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { GiHamburger } from "react-icons/gi";
import { HiDocumentCurrencyDollar } from "react-icons/hi2";
import { LuSettings2 } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

export default function SideMenu() {
  const navigate = useNavigate();
  const [links] = useState([
    { id: 1, name: "Dashboard", icon: <MdOutlineSpaceDashboard />, path: "/" },
    {
      id: 2,
      name: "FoodAndDrinks",
      icon: <GiHamburger />,
      path: "/orders",
    },
    {
      id: 3,
      name: "Bills",
      icon: <HiDocumentCurrencyDollar />,
      path: "/bills",
    },
    {
      id: 4,
      name: "Setting",
      icon: <LuSettings2 />,
      path: "/settings",
    },
  ]);

  const [activeLink, setActiveLink] = useState(0);

  const handleLogOut = () => {
    navigate("/login");
  };
  return (
    <div
      className="d-flex flex-column justify-content-between border-end px-3 "
      id={styles.SideMenu}
    >
      <div className="col-12 d-flex flex-column gap-2">
        <div className="col-12 d-flex align-items-center gap-2 py-3">
          <RiShoppingBag3Fill className={styles.icon} id="" />
          <p className="m-0 fs-4">
            Smart<span id={styles.logo}>Pos</span>
          </p>
        </div>

        {links.map((el) => {
          return (
            <Link
              key={el.id}
              to={el.path}
              onClick={() => setActiveLink(el.id)}
              className={
                "nav-link col-12 px-3 d-flex gap-2 align-items-center " +
                (activeLink == el.id ? styles.activeLink : "") +
                " " +
                styles.link
              } // error
            >
              {el.icon}
              <p className="m-0">{el.name}</p>
            </Link>
          );
        })}
      </div>

      <div className="col-12 d-flex flex-column align-items-center pb-5">
        <FaUserCircle className="fs-3" />
        <img id={styles.userImg} />
        <h3>User Name</h3>
        <p>User Role</p>
        <button onClick={handleLogOut} className="btn btn-primary">
          Log Out
        </button>
      </div>
    </div>
  );
}
// import React, { useState } from "react";
// import styles from "./SideMenu.module.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { RiShoppingBag3Fill } from "react-icons/ri";
// import { MdOutlineSpaceDashboard } from "react-icons/md";
// import { GiHamburger } from "react-icons/gi";
// import { HiDocumentCurrencyDollar } from "react-icons/hi2";
// import { LuSettings2 } from "react-icons/lu";
// import { FaUserCircle } from "react-icons/fa";

// export default function SideMenu() {
//   const navigate = useNavigate()
//   const [links] = useState([
//     { id: 1, name: "Dashboard", icon: <MdOutlineSpaceDashboard />, path: "/" },
//     {
//       id: 2,
//       name: "FoodAndDrinks",
//       icon: <GiHamburger />,
//       path: "/orders",
//     },
//     {
//       id: 3,
//       name: "Bills",
//       icon: <HiDocumentCurrencyDollar />,
//       path: "/bills",
//     },
//     {
//       id: 4,
//       name: "Setting",
//       icon: <LuSettings2 />,
//       path: "/settings",
//     },
//   ]);

//   const handleLogOut = () =>{
//     navigate('/login')
//   }
//   return (
//     <div
//       className="d-flex flex-column justify-content-between px-3 "
//       id={styles.SideMenu}
//     >
//       <div className="col-12 d-flex flex-column gap-2">
//         <div className="col-12 d-flex align-items-center gap-2 py-3">
//           <RiShoppingBag3Fill className={styles.icon} id="" />
//           <p className="m-0 fs-4">
//             Smart<span id={styles.logo}>Pos</span>
//           </p>
//         </div>

//         {links.map((el, index) => {
//           return (
//             <Link
//               key={el.id}
//               to={el.path}
//               className={
//                 "nav-link col-12 px-3 d-flex gap-2 align-items-center" +
//                 styles.activeLink +
//                 " " +
//                 styles.link
//               }
//             >
//               {el.icon}
//               <p className="m-0">{el.name}</p>
//             </Link>
//           );
//         })}
//       </div>

//       <div className="col-12 d-flex flex-column align-items-center pb-5">
//         <FaUserCircle className="fs-3"/>
//         <img id={styles.userImg} />
//         <h3>User Name</h3>
//         <p>User Role</p>
//         <button onClick={handleLogOut} className="btn btn-primary">Log Out</button>
//       </div>
//     </div>
//   );
// }
