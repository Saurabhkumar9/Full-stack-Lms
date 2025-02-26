import React from "react";

function Home() {
  return (
    <>
      <div className="bg-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">Information</h2>

          {/* Responsive Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-gray-100 shadow-md rounded-xl text-gray-900">
                <h3 className="text-lg font-semibold text-blue-600">
                  💻 100+ Total Online Courses
                </h3>
                <p className="mt-2 text-gray-600">
                  Access a variety of courses across multiple domains.
                </p>
              </div>
              <div className="p-6 bg-gray-100 shadow-md rounded-xl text-gray-900">
                <h3 className="text-lg font-semibold text-blue-600">
                  🎓 Total Student Register
                </h3>
                <p className="mt-2 text-gray-600">
                  Learn from industry-leading professionals and educators.
                </p>
              </div>
              <div className="p-6 bg-gray-100 shadow-md rounded-xl text-gray-900">
                <h3 className="text-lg font-semibold text-blue-600">
                  🔒 Lifetime Access
                </h3>
                <p className="mt-2 text-gray-600">
                  Enjoy unlimited access to your enrolled courses.
                </p>
              </div>
              <div className="p-6 bg-gray-100 shadow-md rounded-xl text-gray-900">
                <h3 className="text-lg font-semibold text-blue-600">
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



