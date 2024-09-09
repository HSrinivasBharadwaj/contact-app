import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactList from "./ContactList";

const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const goToCreateContactsPage = () => {
    navigate("/createcontacts");
  };
  return (
    <div className="p-6 bg-gray-100 h-screen">
      <div className="mb-6 flex justify-between items-center">
        <button onClick={goToCreateContactsPage} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
          Create Contact
        </button>
      </div>
      <ContactList />
    </div>
  );
};

export default Contacts;
