import { configureStore } from "@reduxjs/toolkit";
import recibosReducer from '../Features/recibos/recibosSlice'
import dineroReducer from "../Features/dinero/dineroSlice";
import gastosReducer from '../Features/gastos/gastosSlice';
import presupuestoReducer from "../Features/presupuestos/presupuestoSlice";

export const store = configureStore({
    reducer: {
        recibos: recibosReducer,
        dinero: dineroReducer,
        gastos: gastosReducer,
        presupuesto: presupuestoReducer
    }
})