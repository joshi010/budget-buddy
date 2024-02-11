import React from "react";
import { selectGastoTotal } from "./gastosSlice";
import { useSelector } from "react-redux";

export default function Gastos(){
    const gastoTotal = useSelector(selectGastoTotal);
    return(
        <div className="seccion-dinero">
            <div>
                <h2 className="titulo-seccion">Gastos</h2>
                <h2 id="gastos">{`$${(gastoTotal).toFixed(2)} MXN.`}</h2>
            </div>
            <div className="fuentes-dinero">
                <div className="sub-titulo">
                    <h4>Categorías Gastos</h4>
                </div>
            </div>
        </div>
    )
}