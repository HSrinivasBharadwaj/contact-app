import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

const ContactViewDetails = () => {
  const { id } = useParams<{ id: string }>();
  const contactId = Number(id);
  const navigate = useNavigate();
  const getContacts = useSelector(
    (state: RootState) => state.contacts.contacts
  );
  const individualContact = getContacts.find(
    (contact) => contact.id === contactId
  );
  if (!individualContact) return <p>Contact not found</p>;

  const goToViewAllContacts = () => {
    navigate("/")
  }
  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold">Contact Details</h2>
      <p>
        <strong>First Name:</strong> {individualContact.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {individualContact.lastName}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {individualContact.status === "active" ? "Active" : "Inactive"}
      </p>
      <button className="bg-blue-500 text-white cursor-pointer p-2 rounded" onClick={goToViewAllContacts}>Back to Contact</button>
    </div>
  );
};

export default ContactViewDetails;