import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
const reducers = {
    modal: modalSlice.reducer,
};
export default reducers;