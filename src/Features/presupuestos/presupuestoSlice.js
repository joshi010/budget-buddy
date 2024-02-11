import { createSlice } from "@reduxjs/toolkit";

const presupuestoSlice = createSlice({
    name:'presupuesto',
    initialState: {
        presupuesto: 0.00,
        categorias: {}
    },

    reducers: {
        addCategoria(state, action){
            const { id, cat, mont } = action.payload;
            state.categorias[id] = {
                id,
                cat,
                mont,
            }
            state.presupuesto += Number(mont);
        },
        modifyCategoria(state, action){
            const { id, mont } = action.payload;
            const diference = state.categorias[id].mont - mont;
            state.presupuesto -= diference;
            state.categorias[id].mont = mont;
        },
        deleteCategoria(state, action){
            const {id} = action.payload;
            state.presupuesto -= state.categorias[id].mont;
            delete state.categorias[id];
        }
    }
})

export const { addCategoria, modifyCategoria, deleteCategoria } = presupuestoSlice.actions;
export const selectPresupuesto = state => state.presupuesto.presupuesto;
export const selectCategorias = state => state.presupuesto.categorias;

export default presupuestoSlice.reducer;