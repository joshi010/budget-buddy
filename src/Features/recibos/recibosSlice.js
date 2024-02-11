import { createSlice } from "@reduxjs/toolkit";

const recibosSlice = createSlice({
    name: 'recibos',
    initialState: [],
    reducers:{
        addRecibo(state, action){
            const {id, cat, monto, fecha, cond} = action.payload
            state.unshift({id, cat, monto: Number(monto), fecha, cond});
        }
    }
})

export const { addRecibo } = recibosSlice.actions;
export const selectRecibos = state => state.recibos;
export default recibosSlice.reducer;