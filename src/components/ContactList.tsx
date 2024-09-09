import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteContact,
  updateContact,
} from "../features/contacts/contactSlice";
import { RootState } from "../app/store";
import { Contact } from "../types/types";
import { useNavigate } from "react-router-dom";

const ContactList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state: RootState) => state.contacts.contacts);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [status, setStatus] = useState<"active" | "inactive">("active");

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFirstName(contact.firstName);
    setLastName(contact.lastName);
    setStatus(contact.status);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingContact) {
      const updatedContact = {
        ...editingContact,
        firstName,
        lastName,
        status,
      };
      dispatch(updateContact(updatedContact));
      setEditingContact(null);
      setFirstName("");
      setLastName("");
      setStatus("active");
    }
  };

  const goToViewContactPage = (id:any) => {
    navigate("/contact/"+id)
  }

  return (
    <div>
      {contacts.length === 0 && <p>No contacts found</p>}
      <ul>
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex items-center justify-between mb-4"
          >
            <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-1/2 lg:w-1/3 mb-6 mx-4 border border-gray-200">
              <h1 className="font-bold text-xl">
                {contact.firstName} {contact.lastName}
              </h1>
              <div
                className={`mt-1 text-sm font-bold ${
                  contact.status === "active"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {contact.status === "active" ? "Active" : "Inactive"}
              </div>
            </div>
            <div>
              <button className="bg-green-500 text-white px-4 py-1 rounded mr-2" onClick={() => goToViewContactPage(contact.id)}>
                View
              </button>
              <button
                onClick={() => handleEdit(contact)}
                className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteContact(contact.id))}
                className="bg-red-500 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingContact && (
        <form
          onSubmit={handleUpdate}
          className="p-4 bg-white shadow rounded mt-4"
        >
          <h3 className="text-lg font-semibold mb-2">Edit Contact</h3>
          <div className="mb-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="border p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="border p-2 w-full"
            />
          </div>
          <div className="my-4">
            <span className="font-semibold">Status</span>
            <div className="flex items-center space-x-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={status === "inactive"}
                  onChange={() => setStatus("inactive")}
                  className="mr-2"
                />
                Inactive
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Save Updated Contact
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactList;
