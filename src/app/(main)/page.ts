// import Hero from "@/Components/Banner";
// import Navbar from "@/Components/Navbar";

// export default function Home() {
//   return (
//     <>
  
//   <Navbar></Navbar>
//   <Hero></Hero>
//     </>
   
//   );
// }


// app/(main)/page.ts
import Hero from "@/Components/Banner";
import BookingAndNews from "@/Components/BookingAndNews";

import React from "react";

// Next.js পেজ কম্পোনেন্টের জন্য রিটার্ন টাইপ React.ReactElement সেট করা হলো
export default function Home(): React.ReactElement {
  return React.createElement(
    React.Fragment,
    null,
    
    React.createElement(Hero, null),
    React.createElement(BookingAndNews, null)
  );
}
