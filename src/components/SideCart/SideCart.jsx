// import React from "react";
// import styles from "./SideCart.module.css";
// import { useCart } from "../../Store";
// import Swal from "sweetalert2";
// import CheckOut from "../CheckOut/CheckOut";
// import iconEmpty from "../../assets/imgs/emptyCart.png";
// export default function SideCart() {
//   const {
//     closeCart,
//     productInCart,
//     decrementQuantity,
//     incrementQuantity,
//     resetCart,
//     checkOutIndex,
//     openCheckOut,
//   } = useCart();
//   const total = productInCart.reduce(
//     (acc, el) => acc + el.price * el.quantity,
//     0
//   );
//   const handleResetCart = () => {
//     Swal.fire({
//       icon: "question",
//       title: "Are you sure ? ",
//       text: "You will reset the cart?",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes , Reset it",
//       cancelButtonText: "No",
//     }).then((res) => {
//       if (res.isConfirmed) {
//         resetCart();
//       }
//     });
//   };

//   //  useEffect(() => {
//   //     console.log(productInCart);
//   //  }, [productInCart]);
//   return (
//     <div className={styles.overlay} onClick={closeCart}>
//       <div
//         onClick={(e) => e.stopPropagation()}
//         id={styles.content}
//         className="p-3 d-flex flex-column animate__animated animate__fadeInRight"
//       >
//         {productInCart.length > 0 ? (
//           <div className="d-flex flex-column">
//             <p>Your Cart</p>
//             <table className="table table-dark table-bordered align-middle">
//               <thead>
//                 <tr>
//                   <th scope="col">S.No</th>
//                   <th scope="col">Image</th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Price</th>
//                   <th scope="col">Quantity</th>
//                   <th scope="col">Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {productInCart.map((el, index) => {
//                   return (
//                     <tr key={el.documentId}>
//                       <th scope="row">{index + 1}</th>
//                       <td>
//                         <img src={el.product_img} alt="" />
//                       </td>
//                       <td>{el.name}</td>
//                       <td>${el.price}</td>
//                       <td>
//                         <div className="d-flex align-items-center justify-content-center gap-2">
//                           <button
//                             onClick={() => incrementQuantity(el.documentId)}
//                             className="btn btn-sm btn-primary"
//                           >
//                             +
//                           </button>
//                           <span>{el.quantity}</span>
//                           <button
//                             onClick={() => decrementQuantity(el.documentId)}
//                             className="btn btn-sm btn-danger"
//                           >
//                             -
//                           </button>
//                         </div>
//                       </td>
//                       <td>${el.quantity * el.price}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//               <tfoot>
//                 <tr>
//                   <td colSpan={5}>Total </td>
//                   <td colSpan={1}>{total}</td>
//                 </tr>
//               </tfoot>
//             </table>
//             <button onClick={handleResetCart} className="btn btn-danger">
//               Reset Cart
//             </button>
//             <button onClick={openCheckOut} className="btn btn-primary">
//               CheckOut
//             </button>
//           </div>
//         ) : (
//           <div className="d-flex flex-column justify-content-center align-items-center h-100">
//             <img src={iconEmpty} className={styles.icon}  width={250}/>
//             <p className="text-center">Cart is Empty</p>
//           </div>
//         )}
//       </div>

//       {checkOutIndex && <CheckOut />}
//     </div>
//   );
// }


import React from "react";
import styles from "./SideCart.module.css";
import { useCart } from "../../Store";
import Swal from "sweetalert2";
import CheckOut from "../CheckOut/CheckOut";
import iconEmpty from "../../assets/imgs/emptyCart.png";
import { FaTrash, FaShoppingBag, FaCreditCard } from "react-icons/fa";

export default function SideCart() {
  const {
    closeCart,
    productInCart,
    decrementQuantity,
    incrementQuantity,
    resetCart,
    checkOutIndex,
    openCheckOut,
  } = useCart();
  
  const total = productInCart.reduce(
    (acc, el) => acc + el.price * el.quantity,
    0
  );
  
  const handleResetCart = () => {
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "You will reset the cart?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reset it",
      cancelButtonText: "No",
    }).then((res) => {
      if (res.isConfirmed) {
        resetCart();
      }
    });
  };

  return (
    <div className={styles.overlay} onClick={closeCart}>
      <div
        onClick={(e) => e.stopPropagation()}
        id={styles.content}
        className="p-3 d-flex flex-column animate__animated animate__fadeInRight"
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="mb-0"><FaShoppingBag className="me-2" />Your Cart</h4>
          <button className="btn-close" onClick={closeCart}></button>
        </div>
        
        {productInCart.length > 0 ? (
          <div className="d-flex flex-column">
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">-</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {productInCart.map((el, index) => (
                    <tr key={el.documentId}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        <div className="d-flex align-items-center">
                          {el.product_img && (
                            <img 
                              src={el.product_img} 
                              alt={el.name} 
                              className="me-2" 
                              style={{width: "40px", height: "40px", objectFit: "contain"}} 
                            />
                          )}
                          <span>{el.name}</span>
                        </div>
                      </td>
                      <td>${el.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex input-group input-group-sm">
                          <button
                            onClick={() => decrementQuantity(el.documentId)}
                            className="btn btn-outline-secondary"
                            type="button"
                          >
                            -
                          </button>
                          <span className="input-group-text bg-white">{el.quantity}</span>
                          <button
                            onClick={() => incrementQuantity(el.documentId)}
                            className="btn btn-outline-secondary"
                            type="button"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(el.quantity * el.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan={4} className="fw-bold">Total</td>
                    <td className="fw-bold">${total.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div className="d-flex gap-2 mt-3 justify-content-between">
              <button onClick={handleResetCart} className="btn btn-outline-danger d-flex align-items-center">
                <FaTrash className="me-2" /> Clear Cart
              </button>
              <button onClick={openCheckOut} className="btn btn-primary d-flex align-items-center">
                <FaCreditCard className="me-2" /> Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-center h-100 py-5">
            <img 
              src={iconEmpty} 
              className={styles.icon} 
              alt="Empty cart" 
              style={{width: "200px", marginBottom: "20px"}} 
            />
            <h5 className="text-muted mb-3">Your cart is empty</h5>
            <p className="text-center text-muted">Add items to get started</p>
            <button className="btn btn-outline-primary mt-3" onClick={closeCart}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      {checkOutIndex && <CheckOut />}
    </div>
  );
}