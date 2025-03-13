// import React, { useEffect, useState } from "react";
// import styles from "./InvoiceDetails.module.css";
// import { useCategories, useInvoiceDetails } from "../../Store";
// import axios from "axios";
// export default function InvoiceDetails() {
//   const [details, setdetails] = useState();
//   const { closeDetails, activeInvoiceId } = useInvoiceDetails();
//   const { domain } = useCategories();
//   useEffect(() => {
//     if (activeInvoiceId) {
//       let endPoint = `/api/invoices/${activeInvoiceId}`;
//       let url = domain + endPoint;
//       axios
//         .get(url, {
//           params: {
//             populate: {
//               invoices_details: {
//                 populate: {
//                   product: {
//                     populate: "*",
//                   },
//                 },
//               },
//             },
//           },
//         })
//         .then((res) => {
//           console.log(res.data.data);
//           setdetails(res.data.data);
//         });
//     }
//   }, []);
//   return (
//     <div id={styles.overlay} className="overlay" onClick={closeDetails}>
//       <div
//         className="content animate__animated animate__fadeInRight p-3"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">-</th>
//               <th scope="col">Name</th>
//               <th scope="col">Price</th>
//               <th scope="col">Quantity</th>
//               <th scope="col">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {details &&
//               details.invoices_details.map((el, index) => {
//                 return (
//                   <tr key={el.documentId}>
//                     <th>{index + 1}</th>
//                     <th>
//                       {" "}
//                       <img
//                         src={domain + el.product.product_img.url}
//                         alt={el.product.product_name}
//                         width="50px"
//                       />
//                       {el.product.product_name}
//                     </th>
//                     <th>{el.product.product_price}</th>
//                     <th>{el.product_qty}</th>
//                     <th>{el.product.product_price * el.product_qty}</th>
//                   </tr>
//                 );
//               })}
//           </tbody>
//           <tfoot>
//             <tr>
//               <th colSpan="4">Total</th>
//               <th>{details && details.invoice_total}</th>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import styles from "./InvoiceDetails.module.css";
// import { useCategories, useInvoiceDetails } from "../../Store";
// import axios from "axios";
// import { FaTimes } from "react-icons/fa";

// export default function InvoiceDetails() {
//   const [details, setDetails] = useState();
//   const [loading, setLoading] = useState(true);
//   const { closeDetails, activeInvoiceId } = useInvoiceDetails();
//   const { domain } = useCategories();

//   useEffect(() => {
//     if (activeInvoiceId) {
//       setLoading(true);
//       let endPoint = `/api/invoices/${activeInvoiceId}`;
//       let url = domain + endPoint;
//       axios
//         .get(url, {
//           params: {
//             populate: {
//               invoices_details: {
//                 populate: {
//                   product: {
//                     populate: "*",
//                   },
//                 },
//               },
//             },
//           },
//         })
//         .then((res) => {
//           console.log(res.data.data);
//           setDetails(res.data.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching invoice details:", err);
//           setLoading(false);
//         });
//     }
//   }, [activeInvoiceId, domain]);

//   return (
//     <div id={styles.overlay} onClick={closeDetails}>
//       <div
//         id={styles.modalContent}
//         className="animate__animated animate__fadeInRight"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div id={styles.modalHeader}>
//           <h4>Invoice #{details?.id}</h4>
//           <button id={styles.closeButton} onClick={closeDetails}>
//             <FaTimes />
//           </button>
//         </div>

//         {loading ? (
//           <div id={styles.loadingContainer}>
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div id={styles.invoiceInfo}>
//               <div>
//                 <span className="text-muted">Date:</span>
//                 <p>{new Date(details?.createdAt).toLocaleString()}</p>
//               </div>
//               <div>
//                 <span className="text-muted">Cashier:</span>
//                 <p>{details?.pos_user?.user_name || "Unknown"}</p>
//               </div>
//             </div>

//             <div id={styles.tableContainer}>
//               <table id={styles.detailsTable}>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Product</th>
//                     <th>Price</th>
//                     <th>Qty</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {details?.invoices_details?.map((item, index) => {
//                     const imageUrl = item.product?.product_img?.url
//                       ? domain + item.product.product_img.url
//                       : "";

//                     const price = Number(item.product?.product_price) || 0;
//                     const quantity = Number(item.product_qty) || 0;
//                     const itemTotal = price * quantity;

//                     return (
//                       <tr key={item.id || index}>
//                         <td>{index + 1}</td>
//                         <td id={styles.productCell}>
//                           {imageUrl && (
//                             <div id={styles.productImage}>
//                               <img
//                                 src={imageUrl}
//                                 alt={item.product?.product_name || "Product"}
//                               />
//                             </div>
//                           )}
//                           <span id={styles.productName}>
//                             {item.product?.product_name || "Unknown Product"}
//                           </span>
//                         </td>
//                         <td>${price.toFixed(2)}</td>
//                         <td>{quantity}</td>
//                         <td>${itemTotal.toFixed(2)}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//                 <tfoot>
//                   <tr>
//                     <td colSpan="4" id={styles.totalLabel}>
//                       Total
//                     </td>
//                     <td id={styles.totalAmount}>
//                       ${Number(details?.invoice_total || 0).toFixed(2)}
//                     </td>
//                   </tr>
//                 </tfoot>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import styles from "./InvoiceDetails.module.css";
import { useCategories, useInvoiceDetails } from "../../Store";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

export default function InvoiceDetails() {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(true);
  const { closeDetails, activeInvoiceId } = useInvoiceDetails();
  const { domain } = useCategories();

  useEffect(() => {
    if (activeInvoiceId) {
      setLoading(true);
      let endPoint = `/api/invoices/${activeInvoiceId}`;
      let url = domain + endPoint;
      axios
        .get(url, {
          params: {
            populate: ["pos_user", "invoices_details.product"],
          },
        })
        .then((res) => {
          console.log(res.data.data);
          setDetails(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching invoice details:", err);
          setLoading(false);
        });
    }
  }, [activeInvoiceId, domain]);

  return (
    <div id={styles.overlay} onClick={closeDetails}>
      <div
        id={styles.modalContent}
        className="animate__animated animate__fadeInRight"
        onClick={(e) => e.stopPropagation()}
      >
        <div id={styles.modalHeader}>
          <h4>Invoice #{details?.id}</h4>
          <button id={styles.closeButton} onClick={closeDetails}>
            <FaTimes />
          </button>
        </div>

        {loading ? (
          <div id={styles.loadingContainer}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div id={styles.invoiceInfo}>
              <div>
                <span className="text-muted">Date:</span>
                <p>{new Date(details?.createdAt).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-muted">Cashier:</span>
                <p>{details?.pos_user?.user_name || "Unknown"}</p>
              </div>
            </div>

            <div id={styles.tableContainer}>
              <table id={styles.detailsTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {details?.invoices_details?.map((item, index) => {
                    const imageUrl = item.product?.product_img?.url
                      ? domain + item.product.product_img.url
                      : "";

                    const price = Number(item.product?.product_price) || 0;
                    const quantity = Number(item.product_qty) || 0;
                    const itemTotal = price * quantity;

                    return (
                      <tr key={item.id || index}>
                        <td>{index + 1}</td>
                        <td id={styles.productCell}>
                          {imageUrl && (
                            <div id={styles.productImage}>
                              <img
                                src={imageUrl}
                                alt={item.product?.product_name || "Product"}
                              />
                            </div>
                          )}
                          <span id={styles.productName}>
                            {item.product?.product_name || "Unknown Product"}
                          </span>
                        </td>
                        <td>${price.toFixed(2)}</td>
                        <td>{quantity}</td>
                        <td>${itemTotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" id={styles.totalLabel}>
                      Total
                    </td>
                    <td id={styles.totalAmount}>
                      ${Number(details?.invoice_total || 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
