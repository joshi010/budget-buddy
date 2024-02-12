import { createSlice } from "@reduxjs/toolkit";

const dineroSlice = createSlice({
    name: 'dinero',
    initialState: {
        inicial: 0,
        restante: 0,
        ingresos:{},
        tipo:{bancos: 0, efectivo: 0}
    },

    reducers:{
        addFuente(state, action){
            const { id, cat, ing } = action.payload;
            state.ingresos[id] = {
                id,
                cat,
                ing: 0,
            }
        },
        addIngreso(state, action){
            const { ing, id, tipo } = action.payload
            state.ingresos[id].ing += Number(ing);
            state.inicial += Number(ing);
            state.restante += Number(ing);

            switch(tipo){
                case "efectivo": state.tipo.efectivo += Number(ing);
                break;
                case "bancos": state.tipo.bancos += Number(ing);
                break;
            }
        },
        addFuenteGasto(state,action){
            const {id, cat, ing, tipo} = action.payload;
        },
        deleteFuente(state, action){
            const {id} = action.payload;
            delete state.ingresos[id];
        }
    }
})

export const { addIngreso, addFuente, deleteFuente, addFuenteGasto } = dineroSlice.actions;
export const selectInicial = state => state.dinero.inicial;
export const selectRestante = state => state.dinero.restante;
export const selectIngresos = state => state.dinero.ingresos;
export const selectTipo = state => state.dinero.tipo;
export default dineroSlice.reducer;