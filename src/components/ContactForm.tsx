import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addContact } from "../features/contacts/contactSlice";
import { Contact } from "../types/types";
import { useNavigate } from "react-router-dom";

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createContact:Contact = {
      id: Date.now(),
      firstName,
      lastName,
      status
    }
    //Dispatch an action to the store
    dispatch(addContact(createContact));
    //Clear the form fields after submission
    setFirstName("");
    setLastName("");
    setStatus("active");
    navigate("/")
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Create Contact</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <label htmlFor="firstname" className="w-1/3 text-right pr-2">
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
            className="border border-gray-300 p-2 w-2/3 rounded"
            required
          />
        </div>

        
        <div className="flex items-center justify-between">
          <label htmlFor="lastname" className="w-1/3 text-right pr-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            className="border border-gray-300 p-2 w-2/3 rounded"
            required
          />
        </div>

        <div>
          <span className="font-bold text-lg">Status</span>
          <div className="mt-2 flex justify-around">
            <div className="flex items-center">
              <input
                type="radio"
                id="active"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
                className="mr-2"
              />
              <label htmlFor="active">Active</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="inactive"
                value="inactive"
                checked={status === "inactive"}
                onChange={() => setStatus("inactive")}
                className="mr-2"
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
