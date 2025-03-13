// import React, { useState } from "react";
// import styles from "./CheckOut.module.css";
// import { useCart } from "../../Store";
// export default function CheckOut() {
//   const { closeCheckOut, productInCart } = useCart();
//   const handleClose = (e) => {
//     e.stopPropagation();
//     closeCheckOut();
//   };

//   const getTotal = () => {
//     return productInCart.reduce((acc, el) => acc + el.price * el.quantity, 0);
//   };
//   const [customerAmount, setCustomerAmount] = useState("");
//   const [remain, setRemain] = useState(0);
//   const handleCustomerAmount = (e) => {
//     setCustomerAmount(e.target.value);
//     setRemain(+e.target.value - getTotal());
//   };
//   return (
//     <div className={styles.overlay} onClick={handleClose}>
//       <div
//         onClick={(e) => e.stopPropagation()}
//         id={styles.content}
//         className=" bg-white col-10 col-md-6 col-lg-4 p-3 rounded mt-5 shadow animate__animated animate__fadeInDown "
//       >
//         <p className="text-center">Checkout</p>
//         <h3 className="text-center">Total : {getTotal()} </h3>
//         <h3>
//           Customer amount :
//           {
//             <input
//               className="form-control"
//               type="number"
//               placeholder=" Enter Amount Here"
//               value={customerAmount}
//               onChange={handleCustomerAmount}
//             />
//           }
//         </h3>
//         <h4 className="">Remain : {remain}</h4>
//         <button disabled={remain < 0 ? true : false} className="btn btn-primary col-12">Pay</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import styles from "./CheckOut.module.css";
import { useCart, useCategories } from "../../Store";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

export default function CheckOut() {
  const { domain } = useCategories();
  const { closeCheckOut, productInCart, resetCart, closeCart } = useCart();
  const [customerAmount, setCustomerAmount] = useState("");
  const [remain, setRemain] = useState(0);

  const handleClose = (e) => {
    e.stopPropagation();
    closeCheckOut();
  };

  const getTotal = () => {
    return productInCart.reduce((acc, el) => acc + el.price * el.quantity, 0);
  };

  const handleCustomerAmount = (e) => {
    setCustomerAmount(e.target.value);
    setRemain(+e.target.value - getTotal());
  };

  const createRecords = (invoiceId) => {
    productInCart.forEach((el) => {
      let url = domain + "/api/invoices-details";
      let data = {
        product_qty: el.quantity,
        invoice: {
          connect: [invoiceId],
        },
        product: {
          connect: [el.documentId],
        },
      };
      axios
        .post(url, { data: data })
        .then(() => {
          console.log("record saved to DB");
        })
        .catch((err) => {
          console.log(err);
        });
    });
    Swal.fire({
      icon: "success",
      title: "Payment Successfully",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      closeCheckOut();
      resetCart();
      closeCart();
    });
  };

  const createNewInvoice = (total) => {
    let user_id = JSON.parse(sessionStorage.getItem("userInfo")).user_id;
    let endPoint = "/api/invoices";
    let data = {
      invoice_total: total,
      invoice_date: moment().format('YYYY-MM-DD'),
      pos_user: { connect: [user_id] },
    };
    let url = domain + endPoint;
    axios
      .post(url, { data: data })
      .then((res) => {
        let newInvoiceId = res.data.data.documentId;
        createRecords(newInvoiceId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const saveInvoice = () => {
    // add fatora to the system with the total
    let total = getTotal();
    // console.log(total);
    createNewInvoice(total);
    //i will use the id of the current user
  };
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        id={styles.content}
        className="bg-white col-10 col-md-6 col-lg-4 p-4 rounded shadow animate__animated animate__fadeInDown"
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="m-0 fw-bold">Checkout</h3>
          <button className="btn-close" onClick={handleClose}></button>
        </div>

        <div className="card bg-light mb-4 p-3">
          <h4 className="text-center mb-3">Total Amount</h4>
          <h2 className="text-center text-primary mb-0">
            ${getTotal().toFixed(2)}
          </h2>
        </div>

        <div className="mb-4">
          <label htmlFor="customerAmount" className="form-label fw-bold">
            Customer Payment
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">$</span>
            <input
              id="customerAmount"
              className="form-control form-control-lg"
              type="number"
              placeholder="Enter amount"
              value={customerAmount}
              onChange={handleCustomerAmount}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">Change Due:</h4>
          <h4 className={`mb-0 ${remain < 0 ? "text-danger" : "text-success"}`}>
            ${remain}
          </h4>
        </div>

        <div className="d-grid gap-2">
          <button
            onClick={saveInvoice}
            disabled={remain < 0}
            className="btn btn-primary btn-lg"
          >
            Complete Payment
          </button>
        </div>
      </div>
    </div>
  );
}
