import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavHeader from "../../components/NavHeader/NavHeader";
import { useCategories } from "../../Store";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./CategoryProducts.module.css";
import axios from "axios";
export default function CategoryProducts() {
  const params = useParams();
  const navigate = useNavigate();
  const [check, setCheck] = useState(true);
  const { ResetActiveId, domain } = useCategories();
  const [categoryInfo, setCategoryInfo] = useState({});
  useEffect(() => {
    let documentId = params.id;
    let endpoint = `/api/categories/${documentId}`;
    let url = domain + endpoint;
    axios
      .get(url, {
        params: {
          populate: {
            products: {
              populate: "*",
            },
          },
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setCategoryInfo(res.data.data);
        setCheck(true);
      })
      .catch((err) => {
        navigate("/error");
      });

    return () => {
      ResetActiveId();
    };
  }, []);
  return (
    check &&
    <div className="flex-grow-1">
      <NavHeader tabName={categoryInfo.category_name} />
      <h1>Category Product : {categoryInfo.category_name}</h1>
      <div className="col-12 d-flex flex-wrap "> 
        {categoryInfo.products &&
          categoryInfo.products.map((el) => (
            <ProductCard
              key={el.documentId}
              name={el.product_name}
              price={el.product_price}
              imgUrl={ domain + el.product_img.url }
              product={el}
            /> // 
          ))}
        {categoryInfo.products && categoryInfo.products.length == 0 && (
          <h1>No Products</h1>
        )}
      </div>
    </div>
  );
}
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import axios from "axios";

// export default function CategoryProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [check, setCheck] = useState(true);

//   // Correct destructuring - ResetActiveId is a direct method on the store
//   const { domain, ResetActiveId } = useCategories();
//   const [categoryInfo, setCategoryInfo] = useState({});

//   useEffect(() => {
//     let documentId = params.id;
//     let endpoint = `/api/categories/${documentId}`;
//     let url = domain + endpoint;
//     axios
//       .get(url, { params: { populate: "*" } })
//       .then((res) => {
//         console.log(res.data.data);
//         setCategoryInfo(res.data.data);
//         setCheck(true);
//       })
//       .catch((err) => {
//         navigate("/error");
//       });

//     return () => {
//       ResetActiveId();
//     };
//   }, []);

//   return (
//     <div>
//       <NavHeader tabName={categoryInfo.category_name} />
//       <h1>Category Product : {categoryInfo.category_name}</h1>
//       <div className="col-12 d-flex flex-wrap">
//         {categoryInfo.products && categoryInfo.products.length > 0 ? (
//           categoryInfo.products.map((el) => (
//             <ProductCard
//               key={el.documentId}
//             />
//           ))
//         ) : (
//           <h1>No Products</h1>
//         )}
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store";
// import ProductCard from "../../components/ProductCard/ProductCard";
// import axios from "axios";
// export default function CategoryProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const domain = "http://localhost:1337";
//   const [check, setCheck] = useState(true);
//   const { data: categories, ResetActiveId, active_Cat_Id } = useCategories();
//   const [categoryInfo, setCategoryInfo] = useState({});
//   useEffect(() => {
//     let documentId = params.id;
//     let endpoint = `/api/categories/${documentId}`;
//     let url = domain + endpoint;
//     axios.get(url, {}).then((res) => {
//       // for correct data (documentID)
//       // console.log(res);
//     }).catch((err) => {
//       navigate("/error");
//     });

//     // let obj = categories.find((el) => {
//     //   return el.documentId == active_Cat_Id;
//     // });
//     // if (obj) {
//     //   setCategoryInfo(obj);
//     //   setCheck(true);
//     // } else {
//     //   navigate("/error");
//     // }

//     return () => {
//       ResetActiveId();
//     };
//   }, []);
//   return (
//     <div>
//       <NavHeader tabName={categoryInfo.name} />
//       <h1>Category Product {categoryInfo.name}</h1>
//       <div className="col-12 d-flex flex-wrap">
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store";
// import ProductCard from "../../components/ProductCard/ProductCard";
// export default function CategoryProducts() {
//   const navigate = useNavigate();
//   const [check, setCheck] = useState(true);
//   const { data: categories, ResetActiveId, active_Cat_Id } = useCategories();
//   const [categoryInfo, setCategoryInfo] = useState({});
//   useEffect(() => {

//     let obj = categories.find((el) => {
//       return el.documentId == active_Cat_Id;
//     });
//     if (obj) {
//       setCategoryInfo(obj);
//       setCheck(true);
//     } else {
//       navigate("/error");
//     }

//     return () => {
//       ResetActiveId();
//     };
//   }, []);
//   return (
//     <div>
//       <NavHeader tabName={categoryInfo.name} />
//       <h1>Category Product {categoryInfo.name}</h1>
//       <div className="col-12 d-flex flex-wrap">
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//         <ProductCard />
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import burger from "../../assets/imgs/categories/burger.png";
// import wok from "../../assets/imgs/categories/wok.png";
// import NavHeader from "../../components/NavHeader/NavHeader";
// import { useCategories } from "../../Store";
// export default function CategoryProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [check, setCheck] = useState(false);
//   const { data: categories, ResetActiveId, active_Cat_Id } = useCategories();
//   const [categoryInfo, setCategoryInfo] = useState({});
//   useEffect(() => {
//     let obj = categories.find((el) => {
//       return el.documentId == active_Cat_Id;
//     });
//     if (obj) {
//       setCategoryInfo(obj);
//       setCheck(true);
//     } else {
//       navigate("/error");
//     }
//     //useEffect  بتشغل كود بعد ما الكومبوننت تترندر وبتشتغل مرة واحدة فقط
//     // و بتعمل unmounting بعد ما الكومبوننت تترندر مرة تانية
//     return () => {
//       ResetActiveId();
//       // cleanup
//       // console.log("cleanup");
//     };
//   }, []);
//   return (
//     <div>
//       <NavHeader tabName={categoryInfo.name} />
//       <h1>Category Product {categoryInfo.name}</h1>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import burger from "../../assets/imgs/categories/burger.png";
// import wok from "../../assets/imgs/categories/wok.png";
// export default function CategoryProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [check, setCheck] = useState(false);
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: "Cold Drinks",
//       path: "cold",
//       imgUrl: { burger },
//       price: 500,
//     },
//     {
//       id: 2,
//       name: "Burgers",
//       path: "burgers",
//       imgUrl: { burger },
//       price: 600,
//     },
//     { id: 3, name: "Pizza", path: "pizza", imgUrl: { burger }, price: 500 },
//     { id: 4, name: "Wok", path: "wok", imgUrl: { burger }, price: 500 },
//     {
//       id: 4,
//       name: "Dessert",
//       path: "dessert",
//       imgUrl: { burger },
//       price: 700,
//     },
//     { id: 4, name: "Pasta", path: "pasta", imgUrl: { burger }, price: 800 },
//   ]);

//   //filter / find
//   //  find ==> return first element have condition

//   // Filters
//   //find , filter ,findIndex , map , reduce ,foreach ,every ,some
//   // its a function takes a function as a params

//   useEffect(() => {
//     // let routes = ["burger", "pasta", "pizza"];
//     let obj = categories.find((el) => {
//       return el.path == params.catName;
//     });
//     if (obj) {
//       setCheck(true);
//     } else {
//       navigate("/error");
//     }

//     //لو لقيت المسار الحالي موجود في اي واحد من المسارات اللي فوق ساعتها خلينا جوه الصفحة لو لا يبقي نطلع بره

//     // let obj = categories.find((el, index) => {
//     //   return el.name == "Pizza";
//     // });
//     // let objj = categories.findIndex((el, index) => {
//     //     return el.name == "Pizza";
//     //   });
//     // let objjj = categories.filter((el, index) => {
//     //     return el.price == 600;
//     //   });
//     // console.log(obj);
//     // console.log(objj);
//     // console.log(objjj);
//   }, []);
//   return (
//     <div>
//       <h1>Category Product {params.catName}</h1>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import burger from "../../assets/imgs/categories/burger.png";
// import wok from "../../assets/imgs/categories/wok.png";
// import NavHeader from "../../components/NavHeader/NavHeader";
// export default function CategoryProducts() {
//   const params = useParams();
//   const navigate = useNavigate();
//   const [check, setCheck] = useState(false);
//   const [categories, setCategories] = useState([
//     {
//       id: 1,
//       name: "Cold Drinks",
//       path: "cold",
//       imgUrl: { burger },
//       price: 500,
//     },
//     {
//       id: 2,
//       name: "Burgers",
//       path: "burgers",
//       imgUrl: { burger },
//       price: 600,
//     },
//     { id: 3, name: "Pizza", path: "pizza", imgUrl: { burger }, price: 500 },
//     { id: 4, name: "Wok", path: "wok", imgUrl: { burger }, price: 500 },
//     {
//       id: 5,
//       name: "Dessert",
//       path: "dessert",
//       imgUrl: { burger },
//       price: 700,
//     },

//     {
//       id: 6,
//       name: "Pasta",
//       path: "pasta",
//       imgUrl: { burger },
//       price: 700,
//     },
//     { id: 7, name: "home", path: ""},
//   ]);

//   useEffect(() => {
//     if (params){

//       let obj = categories.find((el) => {
//         return el.path == params.catName;
//       });
//       if (obj) {
//         setCheck(true);
//       } else {
//         navigate("/error");
//       }
//     }
//   }, []);
//   return (
//     <div>
//       <NavHeader tabName={params.catName} />
//       <h1>Category Product {params.catName}</h1>
//     </div>
//   );
// }
