// // Styles
// import { useState } from "react";
// import { Link } from "react-router-dom";
// // import { useFetch } from "../../hooks/useFetch";
// // import SearchResults from "../SearchResults/SearchResults";
// import "./Navbar.css";

// export default function Navbar() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(searchQuery);
//     // onSearch(searchQuery);
//   };
//   const handleChange = (e) => {
//     setSearchQuery(e.target.value);
//   };
//   return (
//     <>
//       <nav className="nav__component">
//         <Link to="/" className="logo">
//           Imagely
//         </Link>
//         <form onSubmit={handleSubmit} className="search__form">
//           <input
//             type="text"
//             id="search"
//             required
//             placeholder="Enter a category"
//             value={searchQuery}
//             onChange={handleChange}
//           />
//           <button>Search</button>
//         </form>
//         <span className="theme">💡</span>
//       </nav>

//       {/* <SearchResults searchQuery={searchQuery} /> */}
//     </>
//   );
// }
