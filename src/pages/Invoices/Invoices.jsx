// import React, { useEffect, useState } from "react";
// import styles from "./Invoices.module.css";
// import moment from "moment";
// import { useCategories, useInvoiceDetails } from "../../Store";
// import axios from "axios";
// import InvoiceDetails from "../../components/InvoicDetails/InvoiceDetails";
// export default function Invoices() {
//   const [invoices, setInvoices ] = useState([]);
//   const { domain } = useCategories();
//   const {index , openDetails,setActiveInvoiceId} = useInvoiceDetails()
//   const getInvoices = () => {
//     let url = domain + "/api/invoices";
//     axios
//       .get(url, {
//         params: { populate: "*" },
//       })
//       .then((res) => {
//         console.log(res.data.data);
//         setInvoices(res.data.data);
//       });
//   };
//   useEffect(() => {
//     getInvoices();
//     console.log();
//   }, []);
//   return (
//     <div id={styles.invoicesPage} className="d-flex flex-column p-3">
//    { index && <InvoiceDetails/>}
//       <h3>Invoices</h3>
//       <input
//         type="date"
//         className="form-control"
//         defaultValue={moment().format("YYYY-MM-DD")}
//         max={moment().format("YYYY-MM-DD")}
//       />
//       {invoices.map((el) => {
//         return (
//           <div
//             key={el.documentId}
//             onClick={()=>{(openDetails() , setActiveInvoiceId(el.documentId))}}
//             className="col-12 col-md-6 col-lg-4 rounded border shadow p-3 bg-white d-flex align-items-center justify-content-between"
//           >
//             <div className="d-flex flex-column">
//               <h2>Order #{el.id}</h2>
//               <span>Done By {el.pos_user.user_name} </span>
//             </div>
//             <div className="d-flex flex-column">
//             <h3>{el.invoice_total.toFixed(2)}</h3>
//             <span>{moment(el.createdAt).format('HH:mm')}</span>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

/****************************************************** */
// import React, { useEffect, useState } from "react";
// import styles from "./Invoices.module.css";
// import moment from "moment";
// import { useCategories, useInvoiceDetails } from "../../Store";
// import axios from "axios";
// import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails";
// import { FaReceipt, FaSearch, FaCalendarAlt } from "react-icons/fa";

// export default function Invoices() {
//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
//   const { domain } = useCategories();
//   const { index, openDetails, setActiveInvoiceId } = useInvoiceDetails();

//   const getInvoices = (date) => {
//     let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
//     let user_id = userInfo.user_id;
//     if (!date) { date = moment().format("YYYY-MM-DD") }

//     let url = domain + "/api/invoices";
//     axios
//       .get(url, {
//         params: {
//           populate: {
//             pos_user: {
//               populate: "*",
//             }
//           },
//           filters: {
//             $and: [
//               {
//                 invoice_date: {
//                   $eq: date
//                 }
//               }, {
//                 pos_user: {
//                   documentId: {
//                     $eq: user_id
//                   }
//                 }
//               }
//             ]
//           }
//         },
//       })
//       .then((res) => {
//         if (res.data.data) {
//           setInvoices(res.data.data);
//         } else {
//           setInvoices()
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching invoices:", err);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     getInvoices();
//   }, []);

//   // useEffect(() => { getInvoices(selectedDate) }, [selectedDate]);

//   const handleDateChange = (e) => {
//     getInvoices(e.target.value)
//     setSelectedDate(e.target.value);
//   };

//   const handleViewInvoice = (invoice) => {
//     openDetails();
//     setActiveInvoiceId(invoice.documentId);
//   };

//   return (
//     <div id={styles.invoicesPage} className="d-flex flex-column p-4">
//       {index && <InvoiceDetails />}

//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="mb-0">
//           <FaReceipt className="me-2" /> Invoices
//         </h2>
//         <div className="d-flex align-items-center">
//           <div className="input-group">
//             <span className="input-group-text bg-white">
//               <FaCalendarAlt />
//             </span>
//             <input
//               type="date"
//               className="form-control"
//               value={selectedDate}
//               onChange={handleDateChange}
//               max={moment().format("YYYY-MM-DD")}
//             />
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="d-flex justify-content-center my-5">
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       ) : invoices.length === 0 ? (
//         <div className="alert alert-info text-center my-5">
//           No invoices found for the selected date.
//         </div>
//       ) : (
//         <div className="row g-4">
//           {invoices && invoices.map((invoice) => (
//             <div
//               key={invoice.documentId}
//               className="col-12 col-md-6 col-lg-4"
//             >
//               <div
//                 id={styles.invoiceCard}
//                 className="card h-100 shadow-sm"
//                 onClick={() => handleViewInvoice(invoice)}
//               >
//                 <div className="card-body">
//                   <div className="d-flex justify-content-between align-items-center mb-3">
//                     <h5 className="card-title mb-0">Order #{invoice.id}</h5>
//                     <span className="badge bg-primary rounded-pill">
//                       {moment(invoice.createdAt).format("HH:mm")}
//                     </span>
//                   </div>
//                   <div className="d-flex justify-content-between">
//                     <p className="text-muted mb-0">
//                       <small>Processed by:</small>
//                       <br />
//                       <strong>
//                         {invoice.pos_user.user_name}
//                       </strong>
//                     </p>
//                     <div className="text-end">
//                       <small className="text-muted">Total:</small>
//                       <br />
//                       <h4 className="text-success mb-0">
//                         ${invoice.invoice_total}
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="card-footer bg-transparent text-muted text-center">
//                   <small>Click to view details</small>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
/****************************************************** */

import React, { useEffect, useState } from "react";
import styles from "./Invoices.module.css";
import moment from "moment";
import { useCategories, useInvoiceDetails } from "../../Store";
import axios from "axios";
import InvoiceDetails from "../../components/InvoiceDetails/InvoiceDetails";
import { FaReceipt, FaCalendarAlt } from "react-icons/fa";

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState([]);
  const { domain } = useCategories();
  const { index, openDetails, setActiveInvoiceId } = useInvoiceDetails();

  const getInvoices = (date) => {
    try {
      let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
      if (!userInfo || !userInfo.user_id) {
        console.error("Invalid user info in session storage");
        setLoading(false);
        return;
      }

      let user_id = userInfo.user_id;

      if (!date) {
        date = moment().format("YYYY-MM-DD");
      } else {
        date = moment(date).format("YYYY-MM-DD");
      }

      setLoading(true);
      console.log("Fetching invoices for date:", date, "user ID:", user_id);

      let url = domain + "/api/invoices";
      axios
        .get(url, {
          params: {
            populate: "*", // Simpler populate pattern
            filters: {
              $and: [
                {
                  invoice_date: {
                    $eq: date,
                  },
                },
                {
                  pos_user: {
                    documentId: {
                      $eq: user_id,
                    },
                  },
                },
              ],
            },
          },
        })
        .then((res) => {
          console.log("API response:", res.data);
          if (res.data.data) {
            setInvoices(res.data.data);
          } else {
            setInvoices([]);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching invoices:", err);
          setLoading(false);
        });
    } catch (error) {
      console.error("Error in getInvoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getInvoices();
  }, []);

  const handleDateChange = (e) => {
    console.log('date00' + e.target.value)
    getInvoices(e.target.value);
    setSelectedDate(e.target.value);
  };

  const handleViewInvoice = (invoice) => {
    openDetails();
    setActiveInvoiceId(invoice.documentId);
  };

  // Helper function to safely get the invoice total
  const getInvoiceTotal = (invoice) => {
    // Try multiple property names that could contain the total
    const total = invoice.invoice_total || invoice.invoices_total || 0;
    return Number(total).toFixed(2);
  };

  return (
    <div id={styles.invoicesPage} className="d-flex flex-column p-4">
      {index && <InvoiceDetails />}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaReceipt className="me-2" /> Invoices
        </h2>
        <div className="d-flex align-items-center">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <FaCalendarAlt />
            </span>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={handleDateChange}
              max={moment().format("YYYY-MM-DD")}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : invoices.length === 0 ? (
        <div className="alert alert-info text-center my-5">
          No invoices found for the selected date.
        </div>
      ) : (
        <div className="row g-4">
          {invoices.map((invoice) => (
            <div key={invoice.documentId} className="col-12 col-md-6 col-lg-4">
              <div
                id={styles.invoiceCard}
                className="card h-100 shadow-sm"
                onClick={() => handleViewInvoice(invoice)}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title mb-0">Order #{invoice.id}</h5>
                    <span className="badge bg-primary rounded-pill">
                      {moment(invoice.createdAt).format("HH:mm")}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">
                      <small>Processed by:</small>
                      <br />
                      <strong>
                        {invoice.pos_user?.user_name || "Unknown"}
                      </strong>
                    </p>
                    <div className="text-end">
                      <small className="text-muted">Total:</small>
                      <br />
                      <h4 className="text-success mb-0">
                        ${getInvoiceTotal(invoice)}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-transparent text-muted text-center">
                  <small>Click to view details</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
/****************************************************** */
