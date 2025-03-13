// import React from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import styles from "./NavHeader.module.css";
// import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { useCart, useCategories } from "../../Store";
// import { FaCartShopping } from "react-icons/fa6";

// export default function NavHeader({ tabName }) {
//   const navigateBack = useNavigate();
//   const { active_Cat_Id } = useCategories();
//   const { openCart, productInCart } = useCart();
//   return (
//     <div>
//       <header className="col-12 d-flex p-4 gap-4 justify-content-between align-items-center">
//         <div className="d-flex gap-4 align-items-center">
//           {active_Cat_Id != 0 && (
//             <IoIosArrowRoundBack
//               className={styles.backBtn}
//               onClick={() => navigateBack("/orders")}
//             />
//           )}
//           <div className="d-flex gap-2 align-items-center">
//             <p className="m-0">Food & Drinks</p>
//             <MdOutlineKeyboardArrowRight />

//             <p className="m-0">{tabName}</p>
//           </div>
//         </div>
//         <div className="d-flex align-items-center">
//           <div className="position-relative me-3">
//             <FaCartShopping
//               className={`${styles.cartIcon} fs-4`}
//               onClick={openCart}
//             />
//             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
//               {productInCart.reduce((acc, el) => acc + el.quantity, 0)}
//             </span>
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// }

// // import React from "react";
// // import { IoIosArrowRoundBack } from "react-icons/io";
// // import styles from "./NavHeader.module.css";
// // import { MdOutlineKeyboardArrowRight } from "react-icons/md";
// // import { useNavigate } from "react-router-dom";
// // import { useCategories } from "../../Store";
// // import { FaCartShopping } from "react-icons/fa6";

// // export default function NavHeader({ tabName }) {
// //   const navigateBack = useNavigate();
// //   const { active_Cat_Id } = useCategories();
// //   return (
// //     <div>
// //       <header className="col-12 d-flex p-4 gap-4 justify-content-between align-items-center">
// //         <div className="d-flex  align-items-center">

// //         {active_Cat_Id != 0 && (
// //           <IoIosArrowRoundBack
// //             className={styles.backBtn}
// //             onClick={() => navigateBack("/orders")}
// //           />
// //         )}
// //         <div className="d-flex gap-2 align-items-center">
// //           <p className="m-0">Food & Drinks</p>
// //           <MdOutlineKeyboardArrowRight />

// //           <p className="m-0">{tabName}</p>
// //         </div>
// //         </div>

// //         <FaCartShopping className=""/>
// //       </header>
// //     </div>
// //   );
// // }





import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "./NavHeader.module.css";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useCart, useCategories } from "../../Store";
import { FaCartShopping } from "react-icons/fa6";

export default function NavHeader({ tabName }) {
  const navigateBack = useNavigate();
  const { active_Cat_Id } = useCategories();
  const { openCart, productInCart } = useCart();
  
  const cartItemCount = productInCart.reduce((acc, el) => acc + el.quantity, 0);
  
  return (
    <nav className="bg-white">
      <div className="container-fluid">
        <header className="d-flex py-3 justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {active_Cat_Id != 0 && (
              <button 
                className={`btn btn-light rounded-circle me-3 ${styles.backBtn}`}
                onClick={() => navigateBack("/orders")}
                aria-label="Go back"
              >
                <IoIosArrowRoundBack size={22} />
              </button>
            )}
            
            <div className="d-flex align-items-center">
              <span className="text-muted">Food & Drinks</span>
              <MdOutlineKeyboardArrowRight className="mx-1 text-muted" />
              <h5 className="mb-0 fw-bold">{tabName}</h5>
            </div>
          </div>
          
          <div className="position-relative">
            <button 
              className="btn btn-light rounded-circle position-relative"
              onClick={openCart}
              aria-label="Shopping cart"
            >
              <FaCartShopping className={styles.cartIcon} size={18} />
              
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cartItemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </button>
          </div>
        </header>
      </div>
    </nav>
  );
}