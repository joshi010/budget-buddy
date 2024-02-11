import { createSlice } from "@reduxjs/toolkit";

const gastosSlice = createSlice({
    name: 'gastos',
    initialState:{
        gastoTotal: 0,
        gasto: {}
    },
    reducers:{
        addGasto(state, action){
            const {id, cat, eg, desc, date} = action.payload;
            state.gasto[cat] = {
                [id]:{
                    eg,
                    desc,
                    date
                }
            }
        }
    }
})


export const selectGastoTotal = state => state.gastos.gastoTotal;
export default gastosSlice.reducer;