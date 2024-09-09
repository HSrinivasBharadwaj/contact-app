import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact } from "../../types/types";

interface ContactState {
    contacts: Contact[]
}

const initialState: ContactState = {
    contacts: []
}

const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        addContact: (state, action: PayloadAction<Contact>) => {
            state.contacts.push(action.payload)
        },
        deleteContact: (state, action: PayloadAction<number>) => {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload)
        },
        updateContact: (state, action: PayloadAction<Contact>) => {
            const contacts = state.contacts.findIndex(contact => contact.id === action.payload.id);
            if (contacts >= 0) {
                state.contacts[contacts] = action.payload;
            }
        }
    }
})

export const { addContact, deleteContact,updateContact } = contactSlice.actions;
export default contactSlice.reducer