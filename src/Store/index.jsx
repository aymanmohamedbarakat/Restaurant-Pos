// // Global State
import { create } from "zustand";

export const useCategories = create((set) => ({
  domain: "http://localhost:1337",
  data: [],

  // Action State
  active_Cat_Id: 0,
  //Methods
  setData: (categories) => set(() => ({ data: categories })),
  ChangeActiveCat: (activeTabId) => set(() => ({ active_Cat_Id: activeTabId })),
  ResetActiveId: () => set(() => ({ active_Cat_Id: 0 })),
}));

export const useCart = create((set) => ({
  cartIndex: false,
  productInCart: [],
  checkOutIndex: false,

  //Methods
  openCart: () => set(() => ({ cartIndex: true })),
  closeCart: () => set(() => ({ cartIndex: false })),

  openCheckOut: () => set(() => ({ checkOutIndex: true })),
  closeCheckOut: () => set(() => ({ checkOutIndex: false })),
  // toggleCart : () => set((state) => ({ cartIndex: !state.cartIndex })),

  // decrementQuantity: (documentId) =>
  //   set((state) => ({
  //     productInCart: state.productInCart.map((el) =>
  //       el.documentId === documentId ? { ...el, quantity: el.quantity - 1 } : el
  //     ),
  //   })),
  decrementQuantity: (documentId) =>
    set((state) => {
      let copyArray = [...state.productInCart];
      let index = copyArray.findIndex((el) => el.documentId === documentId);
      if (copyArray[index].quantity > 1) {
        copyArray[index].quantity--;
      } else {
        copyArray.splice(index, 1);
      }
      let obj = { productInCart: copyArray };
      return obj;
    }),

  incrementQuantity: (documentId) =>
    set((state) => {
      let copyArray = [...state.productInCart];
      let index = copyArray.findIndex((el) => el.documentId === documentId);
      copyArray[index].quantity++;
      let obj = { productInCart: copyArray };
      return obj;
    }),

  addToCart: (product) =>
    set((state) => {
      let copy = [...state.productInCart];
      let obj = copy.find((el) => el.documentId == product.documentId);
      if (obj) {
        //increment
        state.incrementQuantity(product.documentId);
      } else {
        copy.push(product);
      }
      // let copy = [...state.productInCart , product];
      // copy.push(product)
      return { productInCart: copy };
    }),

  resetCart: () => set(() => ({ productInCart: [] })),
}));

// import ColdCola from "../assets/imgs/categories/coldCola.png";
// import burger from "../assets/imgs/categories/burger.png";
// import pasta from "../assets/imgs/categories/Pasta.png";
// import wok from "../assets/imgs/categories/Wok.png";
// import dessert from "../assets/imgs/categories/donut.png";
// import pizza from "../assets/imgs/categories/pizza.png";
// import { create } from "zustand";

// export const useCategories = create((set) => ({
//   domain: "http://localhost:1337",
//   data: [
//     // {
//     //   documentId: 1,
//     //   name: "Cold Drinks",
//     //   path: "cold",
//     //   price: 500,
//     //   imgUrl: ColdCola,
//     // },
//     // {
//     //   documentId: 2,
//     //   name: "Burgers",
//     //   path: "burgers",
//     //   price: 600,
//     //   imgUrl: burger,
//     // },
//     // { documentId: 3, name: "Wok", path: "wok", price: 500, imgUrl: wok },
//     // {
//     //   documentId: 4,
//     //   name: "Dessert",
//     //   path: "dessert",
//     //   price: 700,
//     //   imgUrl: dessert,
//     // },
//     // {
//     //   documentId: 5,
//     //   name: "Pasta",
//     //   path: "pasta",
//     //   price: 800,
//     //   imgUrl: pasta,
//     // },
//     // { documentId: 6, name: "Pizza", path: "pizza", price: 400, imgUrl: pizza },
//   ],
//   // Action State

//   active_Cat_Id: 0,
//   //Methods
//   setData: (categories) => set(() => ({ data: categories })),
//   ChangeActiveCat: (activeTabId) => set(() => ({ active_Cat_Id: activeTabId })),
//   ResetActiveId: () => set(() => ({ active_Cat_Id: 0 })),
// }));

// import ColdCola from "../assets/imgs/categories/coldCola.png";
// import burger from "../assets/imgs/categories/burger.png";
// import pasta from "../assets/imgs/categories/Pasta.png";
// import wok from "../assets/imgs/categories/Wok.png";
// import dessert from "../assets/imgs/categories/donut.png";
// import pizza from "../assets/imgs/categories/pizza.png";
// import { create } from "zustand";

// export const useCategories = create((set) => ({
//   domain: "http://localhost:1337",
//   data: [
//     {
//       documentId: 1,
//       name: "Cold Drinks",
//       path: "cold",
//       price: 500,
//       imgUrl: ColdCola,
//     },
//     {
//       documentId: 2,
//       name: "Burgers",
//       path: "burgers",
//       price: 600,
//       imgUrl: burger,
//     },
//     { documentId: 3, name: "Wok", path: "wok", price: 500, imgUrl: wok },
//     {
//       documentId: 4,
//       name: "Dessert",
//       path: "dessert",
//       price: 700,
//       imgUrl: dessert,
//     },
//     {
//       documentId: 5,
//       name: "Pasta",
//       path: "pasta",
//       price: 800,
//       imgUrl: pasta,
//     },
//     { documentId: 6, name: "Pizza", path: "pizza", price: 400, imgUrl: pizza },
//   ],
//   // Action State
//   active_Cat_Id: 0,

//   ChangeActiveCat: (activeTabId) => set(() => ({ active_Cat_Id: activeTabId })),

//   ResetActiveId: () => set(() => ({ active_Cat_Id: 0 })),
// }));
// import ColdCola from "../assets/imgs/categories/coldCola.png";
// import burger from "../assets/imgs/categories/burger.png";
// import pasta from "../assets/imgs/categories/Pasta.png";
// import wok from "../assets/imgs/categories/Wok.png";
// import dessert from "../assets/imgs/categories/donut.png";
// import pizza from "../assets/imgs/categories/pizza.png";
// import { create } from "zustand";
// // Change from initCategories to useCategories
// export const useCategories = create((set) => ({
//   //set is a function that will be used to update the state
//   // I Will Return The State As An Object
//   data: [
//     {
//       documentId: 1,
//       name: "Cold Drinks",
//       path: "cold",
//       price: 500,
//       imgUrl: ColdCola,
//     },
//     {
//       documentId: 2,
//       name: "Burgers",
//       path: "burgers",
//       price: 600,
//       imgUrl: burger,
//     },
//     { documentId: 3, name: "Wok", path: "wok", price: 500, imgUrl: wok },
//     {
//       documentId: 4,
//       name: "Dessert",
//       path: "dessert",
//       price: 700,
//       imgUrl: dessert,
//     },
//     {
//       documentId: 5,
//       name: "Pasta",
//       path: "pasta",
//       price: 800,
//       imgUrl: pasta,
//     },
//     { documentId: 6, name: "Pizza", path: "pizza", price: 400, imgUrl: pizza },
//   ],
//   // Action State
//   active_Cat_Id: 0,
//   //Method to change the active category
//   ChangeActiveCat: (activeTabId) => set(() => ({ active_Cat_Id: activeTabId })),
//   //Method to change the active category
//   ResetActiveId: () => set(() => ({ active_Cat_Id: 0 })),
// }));

// // const sayHello = () => {
// //     //Block Of Code
// //     return "Hello"
// // }

// // const sayHello = () => "Hello"
// // const sayGoodbye = () => ("Goodbye")
// // const sayHi = () => ()  // ==>  {return {obj}}

// // () === {return } // Block Of code with return

// //   const [categories] = useState([
// //     { id: 1, name: "Cold Drinks", path: "cold", price: 500 },
// //     { id: 2, name: "Burgers", path: "burgers", price: 600 },
// //     { id: 3, name: "Pizza", path: "pizza", price: 500 },
// //     { id: 4, name: "Wok", path: "wok", price: 500 },
// //     { id: 5, name: "Dessert", path: "dessert", price: 700 },
// //     { id: 6, name: "Pasta", path: "pasta", price: 800 },
// //   ]);

// // Create Zustand State
// import { create } from "zustand";

// // init State
// // const initialState = create
// // Sytax: const useCategories = create(()=>({}))
// export const initCategories = create(() =>
//   // I Will Return The State As An Object
//   ({
//     // Value / return ==> Object
//     data: [
//       { id: 1, name: "Cold Drinks", path: "cold", price: 500 },
//       { id: 2, name: "Burgers", path: "burgers", price: 600 },
//       { id: 3, name: "Pizza", path: "pizza", price: 500 },
//       { id: 4, name: "Wok", path: "wok", price: 500 },
//       { id: 5, name: "Dessert", path: "dessert", price: 700 },
//       { id: 6, name: "Pasta", path: "pasta", price: 800 },
//     ],
//     // Action State
//     // addCategory: (category) => {},
//   })
// );
