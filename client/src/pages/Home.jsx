// import React from "react";

// function Home() {
//   return (
//     <>
//        <div className="bg-gray-100 py-12">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-gray-900">
//              Infromation
//           </h2>
//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <h3 className="text-xl font-semibold text-indigo-600">
//                 💻 100+ Total Online Courses
//               </h3>
//               <p className="mt-2 text-gray-600">
//                 Access a variety of courses across multiple domains.
//               </p>
//             </div>
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <h3 className="text-xl font-semibold text-indigo-600">
//                 🎓 Total Student Regiter
//               </h3>
//               <p className="mt-2 text-gray-600">
//                 Learn from industry-leading professionals and educators.
//               </p>
//             </div>
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <h3 className="text-xl font-semibold text-indigo-600">
//                 🔒 Lifetime Access
//               </h3>
//               <p className="mt-2 text-gray-600">
//                 Enjoy unlimited access to your enrolled courses.
//               </p>
//             </div>
//             <div className="p-6 bg-white shadow-lg rounded-lg">
//               <h3 className="text-xl font-semibold text-indigo-600">
//                 💰 Total sell course
//               </h3>
//               <p className="mt-2 text-gray-600">
//                 Your satisfaction is our priority. Terms apply.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div> 



      
//     </>
//   );
// }

// export default Home;


import React from "react";

function Home() {
  return (
    <>
      <div className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Information</h2>

          {/* Wrapper div for horizontal scrolling on small screens */}
          <div className="mt-6 overflow-x-auto">
            <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-2 gap-6 w-max sm:w-full">
              <div className="p-6 bg-white shadow-lg rounded-lg min-w-[250px] sm:min-w-full">
                <h3 className="text-xl font-semibold text-indigo-600">
                  💻 100+ Total Online Courses
                </h3>
                <p className="mt-2 text-gray-600">
                  Access a variety of courses across multiple domains.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg min-w-[250px] sm:min-w-full">
                <h3 className="text-xl font-semibold text-indigo-600">
                  🎓 Total Student Register
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn from industry-leading professionals and educators.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg min-w-[250px] sm:min-w-full">
                <h3 className="text-xl font-semibold text-indigo-600">
                  🔒 Lifetime Access
                </h3>
                <p className="mt-2 text-gray-600">
                  Enjoy unlimited access to your enrolled courses.
                </p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-lg min-w-[250px] sm:min-w-full">
                <h3 className="text-xl font-semibold text-indigo-600">
                  💰 Total Sold Courses
                </h3>
                <p className="mt-2 text-gray-600">
                  Your satisfaction is our priority. Terms apply.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
