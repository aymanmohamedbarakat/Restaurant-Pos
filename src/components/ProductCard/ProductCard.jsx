import React from "react";
import styles from "./ProductCard.module.css";
import { useCart } from "../../Store";
import { FaShoppingCart } from "react-icons/fa";
export default function ProductCard({
  name,
  price,
  imgUrl,
  weight = "20 g",
  product,
}) {
  const { addToCart } = useCart();
  const handleAdd = () => {
    let obj = {
      documentId: product.documentId,
      name: product.product_name,
      price: product.product_price,
      quantity: 1,
      product_img: imgUrl,
    };
    addToCart(obj);
    console.log(obj);
  };
  //error
  return (
    <div className="col-12 col-md-6 col-lg-4 p-3">
      <div
        className={`shadow rounded border p-3 d-flex flex-column flex-wrap col-12 ${styles.Card}`}
      >
        <img src={imgUrl} />
        <h4>{name}</h4>
        <span>{weight}</span>
        <p>$ {price}</p>
        <button className={styles.addButton} onClick={handleAdd}>
          <FaShoppingCart className={styles.cartIcon} />
          <span className="text-black">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}

// //Table
// //App User (cashier)
// // Strapi User (Admin) Super, Admin,
// // API

// import React from "react";
// import styles from "./ProductCard.module.css";
// import { useCart } from "../../Store";
// import { FaShoppingCart } from "react-icons/fa";

// export default function ProductCard({
//   name,
//   price,
//   imgUrl,
//   weight = "20 g",
//   product,
// }) {
//   const { addToCart } = useCart();

//   const handleAdd = () => {
//     let obj = {
//       documentId: product.documentId,
//       name: product.product_name,
//       price: product.product_price,
//       quantity: 1,
//       product_img: imgUrl,
//     };
//     addToCart(obj);
//   };

//   return (
// <div className="col-12 col-md-6 col-lg-4 p-3">
//   <div className={styles.Card}>
//     <img src={imgUrl || 'placeholder-path.jpg'} alt={name} />
//     <div className={styles.productInfo}>
//       <h3>{name}</h3>
//       <span>{weight}</span>
//       <p>$ {parseFloat(price).toFixed(2)}</p>
//       <button className={styles.addButton} onClick={handleAdd}>
//         <FaShoppingCart className={styles.cartIcon} />
//         <span className="text-black">Add to Cart</span>
//       </button>
//     </div>
//   </div>
// </div>
//   );
// }
