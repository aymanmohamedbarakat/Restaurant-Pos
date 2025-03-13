import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { Link, useNavigate } from "react-router-dom";
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategories } from "../../Store/index";
import axios from "axios";
export default function Categories() {
  const domain = "http://localhost:1337";
  const { ChangeActiveCat, data: appCategories } = useCategories(); //Global State

  const navigate = useNavigate();
  const openCategory = (documentId) => {
    ChangeActiveCat(documentId);
    navigate(documentId);
  };
  return (
    <div className="" id={styles.categoriesPage}>
     
      <NavHeader tabName={"Categories"} />
      <div className="d-flex flex-wrap col-12 container">
        {appCategories.map((el) => (
          <div
            key={el.documentId}
            className="col-10 col-md-6 col-lg-4 p-3"
            onClick={() => openCategory(el.documentId)}
          >
            <div
              className={
                styles.productCard + " rounded shadow border col-12 p-3 "
              }
            >
              <img src={domain + el.category_img.url} alt="" />
              <p key={el.documentId}>{el.category_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// import styles from "./Categories.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store/index";
// import axios from "axios";
// export default function Categories() {
//   const domain = "http://localhost:1337";
//   const { ChangeActiveCat } = useCategories(); //Global State
//   const navigate = useNavigate();
//   const [appCategories, setAppCategories] = useState([]);
//   const openCategory = ( documentId) => {
//     ChangeActiveCat(documentId);
//     navigate(documentId);
//   };
//   const getData = () => {
//     let endpoint = "/api/categories/";

//     let url = domain + endpoint;
//     axios
//       .get(url, {
//         params: {
//           populate: "*",
//         },
//       })
//       .then((res) => {
//         setAppCategories(res.data.data);
//         console.log(res.data.data);
//       });
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="" id={styles.categoriesPage}>
//       <NavHeader tabName={"Categories"} />
//       <div className="d-flex flex-wrap col-12 container">
//         {appCategories.map((el) => (
//           <div
//             key={el.documentId}
//             className="col-10 col-md-6 col-lg-4 p-3"
//             onClick={() => openCategory(el.documentId)}
//           >
//             <div
//               className={
//                 styles.productCard + " rounded shadow border col-12 p-3 "
//               }
//             >
//               <img src={domain + el.category_img.url} alt="" />
//               <p key={el.documentId}>{el.category_name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// import React, { useEffect } from "react";
// import styles from "./Categories.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store/index";
// import axios from "axios";
// export default function Categories() {
//   const { data: appCategories, ChangeActiveCat } = useCategories(); //Global State
//   const navigate = useNavigate();
//   const openCategory = (path, categoryId) => {
//     ChangeActiveCat(categoryId);
//     navigate(path);
//   };
//   const getData = () => {
//     let domain = "http://localhost:1337";
//     // أقدر ابعت query params بأيدي اني أمتب جنب ال endpoint
//     // let endpoint = "/api/categories?populate=*";
//     let endpoint = "/api/categories/";
//     //أو عشان تبعت كذا params
//     let url = domain + endpoint;
//     axios.get(url , {
//       params: {
//         populate: "*", // هنا بقدر ابعت كل ال data
//         // q: "Search" , // هنا بقدر ابعت البحث
//         // limit : "10", // هنا بقدر ابعت الليمت
//         // time : "12" // هنا بقدر ابعت الوقت
//       },
//     }).then((res) => {
//       console.log(res.data.data);
//     });
//   };
//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <div className="" id={styles.categoriesPage}>
//       <NavHeader tabName={"Categories"} />
//       <div className="d-flex flex-wrap col-12 container">
//         {appCategories.map((el) => (
//           <div
//             key={el.documentId}
//             className="col-10 col-md-6 col-lg-4 p-3"
//             onClick={() => openCategory(el.path, el.documentId)}
//           >
//             <div
//               className={
//                 styles.productCard + " rounded shadow border col-12 p-3 "
//               }
//             >
//               <img src={el.imgUrl} alt="" />
//               <p key={el.documentId}>{el.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
