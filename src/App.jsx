// useEffect , useNavigate , useState , useLocation

import React, { useEffect, useState } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import SideMenu from "./components/SideMenu/SideMenu";
import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
import Categories from "./pages/Categories/Categories";
import { useCart, useCategories } from "./Store/index";
import axios from "axios";
import SideCart from "./components/SideCart/SideCart";
export default function App() {
  const { domain, setData } = useCategories(); //Global State
    const { cartIndex}= useCart()
  let [acceptedRoutes, setAcceptedRoutes] = useState([
    "/orders",
    "/settings",
    "/bills",
    "/",
  ]);

  const [path, setPath] = useState();
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    console.log("data has been fetched & cached");
    let url = domain + "/api/categories";
    axios.get(url, { params: { populate: "*" } }).then((res) => {
      let cats = res.data.data;
      console.log(cats);
      let routes = cats.map((el) => "/orders/" + el.documentId);
      setAcceptedRoutes([...acceptedRoutes, ...routes]);
      setData(cats);
    });
  }, [domain]);
  return (
    <div className="App d-flex gap-3 col-12">
      { cartIndex && <SideCart />}
      {acceptedRoutes.includes(path) && <SideMenu />}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/orders" element={<Categories />} />
        {/* DynamicRoute */}
        <Route path="/orders/:id" element={<CategoryProducts />} />
        <Route path="/settings" element={<h1>settings</h1>} />
        <Route path="/bills" element={<h1>bills</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="*" element={<h1>404 Page</h1>} />
      </Routes>
    </div>
  );
}

// // useEffect , useNavigate , useState , useLocation

// import React, { useEffect, useState } from "react";
// import {
//   Route,
//   Routes,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
// import Categories from "./pages/Categories/Categories";
// import { useCategories } from "./Store/index";
// import axios from "axios";
// export default function App() {
//   const { domain, setData } = useCategories(); //Global State
//   // let catsRoute = Categories.map((el) => {
//   //   return "/orders/" + el.path;
//   // });
//   let [acceptedRoutes, setAcceptedRoutes] = useState([
//     "/orders",
//     "/settings",
//     "/bills",
//     "/",
//   ]);

//   const [path, setPath] = useState();
//   const location = useLocation();

//   useEffect(() => {
//     setPath(location.pathname);
//   }, [location.pathname]);

//   useEffect(() => {
//     console.log("data has been fetched & cached");
//     let url = domain + "/api/categories";
//     axios.get(url, { params: { populate: "*" } }).then((res) => {
//       let cats = res.data.data;
//       console.log(cats);
//       let routes = cats.map((el) => "/orders/" + el.documentId);
//       setAcceptedRoutes([...acceptedRoutes, ...routes]);
//       setData(cats);
//     });
//   }, [domain]);
//   return (
//     <div className="App d-flex gap-3 col-12">
//       {acceptedRoutes.includes(path) && <SideMenu />}
//       <Routes>
//         <Route path="/" element={<DashBoard />} />
//         <Route path="/orders" element={<Categories />} />
//         {/* DynamicRoute */}
//         <Route path="/orders/:id" element={<CategoryProducts />} />
//         <Route path="/settings" element={<h1>settings</h1>} />
//         <Route path="/bills" element={<h1>bills</h1>} />
//         <Route path="/login" element={<h1>login</h1>} />
//         <Route path="*" element={<h1>404 Page</h1>} />
//       </Routes>
//     </div>
//   );
// }

// import React from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// export default function App() {
//   let acceptedRoute = ["order", "setting", "bills", ""];
//   let url = window.location.href; // has issue her in logout
//   let path = url.split("/")[3];
//   console.log(path);
//   return (
//     <div className="App d-flex gap-1 col-12 accordion">
//       <BrowserRouter>
//         {/* Conditional render */}
//         {/* {path != "login"  ? <h1>Sidebar</h1> : null} */}
//         {/* or */}
//         {acceptedRoute.includes(path) && <SideMenu />}
//         <Routes>
//           <Route path="/" element={<DashBoard />} />
//           <Route path="/orders" element={<h1>Food & Drinks</h1>} />
//           <Route path="/settings" element={<h1>settings</h1>} />
//           <Route path="/bills" element={<h1>bills</h1>} />
//           <Route path="/login" element={<h1>login</h1>} />
//           <Route path="*" element={<h1>404 Page</h1>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// export default function App() {
//   // let url = window.location.href; // has issue her in logout
//   // let path = url.split("/")[3];
//   let acceptedRoute = ["/orders","/settings","/bills","/"];
//   // Hook
//   const [ path , setPath] = useState()
//   const location = useLocation();
//   // console.log(location);
//   useEffect(()=>{
//     setPath(location.pathname)
//     // console.log('Navigated')
//   } , [location.pathname])
//   return (
//     <div className="App d-flex gap-1 col-12 accordion">

//         {/* Conditional render */}
//         {/* {path != "login"  ? <h1>Sidebar</h1> : null} */}
//         {/* or */}
//         {acceptedRoute.includes(path) && <SideMenu />}
//         <Routes>
//           <Route path="/" element={<DashBoard />} />
//           <Route path="/orders" element={<h1>Food & Drinks</h1>} />
//           <Route path="/settings" element={<h1>settings</h1>} />
//           <Route path="/bills" element={<h1>bills</h1>} />
//           <Route path="/login" element={<h1>login</h1>} />
//           <Route path="*" element={<h1>404 Page</h1>} />
//         </Routes>
//     </div>
//   );
// }

// useEffect , useNavigate , useState , useLocation

// import React, { useEffect, useState } from "react";
// import {
//   Route,
//   Routes,
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// import CategoryProducts from "./pages/CategoryProducts/CategoryProducts";
// import Categories from "./pages/Categories/Categories";
// import { useCategories } from "./Store/index";
// export default function App() {
//    const { data: categories } = useCategories(); //Global State
//   let catsRoute = categories.map((el) => {
//     return "/orders/" + el.path;
//   });
//   let acceptedRoute = ["/orders", "/settings", "/bills", "/", ...catsRoute];

//   const [path, setPath] = useState();
//   const location = useLocation();

//   useEffect(() => {
//     setPath(location.pathname);
//   }, [location.pathname]);
//   return (
//     <div className="App d-flex gap-3 col-12">
//       {acceptedRoute.includes(path) && <SideMenu />}
//       <Routes>
//         <Route path="/" element={<DashBoard />} />
//         <Route path="/orders" element={<Categories /> } />
//         {/* DynamicRoute */}
//         <Route path="/orders/:catName" element={<CategoryProducts />} />
//         <Route path="/settings" element={<h1>settings</h1>} />
//         <Route path="/bills" element={<h1>bills</h1>} />
//         <Route path="/login" element={<h1>login</h1>} />
//         <Route path="*" element={<h1>404 Page</h1>} />
//       </Routes>
//     </div>
//   );
// }

// import React from "react";
// import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// export default function App() {
//   let acceptedRoute = ["order", "setting", "bills", ""];
//   let url = window.location.href; // has issue her in logout
//   let path = url.split("/")[3];
//   console.log(path);
//   return (
//     <div className="App d-flex gap-1 col-12 accordion">
//       <BrowserRouter>
//         {/* Conditional render */}
//         {/* {path != "login"  ? <h1>Sidebar</h1> : null} */}
//         {/* or */}
//         {acceptedRoute.includes(path) && <SideMenu />}
//         <Routes>
//           <Route path="/" element={<DashBoard />} />
//           <Route path="/orders" element={<h1>Food & Drinks</h1>} />
//           <Route path="/settings" element={<h1>settings</h1>} />
//           <Route path="/bills" element={<h1>bills</h1>} />
//           <Route path="/login" element={<h1>login</h1>} />
//           <Route path="*" element={<h1>404 Page</h1>} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import DashBoard from "./pages/DashBoard/DashBoard";
// import SideMenu from "./components/SideMenu/SideMenu";
// export default function App() {
//   // let url = window.location.href; // has issue her in logout
//   // let path = url.split("/")[3];
//   let acceptedRoute = ["/orders","/settings","/bills","/"];
//   // Hook
//   const [ path , setPath] = useState()
//   const location = useLocation();
//   // console.log(location);
//   useEffect(()=>{
//     setPath(location.pathname)
//     // console.log('Navigated')
//   } , [location.pathname])
//   return (
//     <div className="App d-flex gap-1 col-12 accordion">

//         {/* Conditional render */}
//         {/* {path != "login"  ? <h1>Sidebar</h1> : null} */}
//         {/* or */}
//         {acceptedRoute.includes(path) && <SideMenu />}
//         <Routes>
//           <Route path="/" element={<DashBoard />} />
//           <Route path="/orders" element={<h1>Food & Drinks</h1>} />
//           <Route path="/settings" element={<h1>settings</h1>} />
//           <Route path="/bills" element={<h1>bills</h1>} />
//           <Route path="/login" element={<h1>login</h1>} />
//           <Route path="*" element={<h1>404 Page</h1>} />
//         </Routes>
//     </div>
//   );
// }
