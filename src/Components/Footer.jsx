import React from "react";


const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-semibold">Programmng Academy</h2>
          <p className="w-full md:w-2/3 text-gray-600 leading-6 mt-2">
            Programmer Academy is your trusted platform for learning new skills and
            advancing your career. From web development to data science, we
            connect learners with top instructors and high-quality resources to
            help you succeed.
          </p>
        </div>

        {/* Middle Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>Courses</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-98765-43210</li>
            <li>support@programmeracademy.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          © {new Date().getFullYear()} EduSite - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
