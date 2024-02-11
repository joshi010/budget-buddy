import React from "react";
import { useSelector } from "react-redux";
import { selectRecibos } from "./recibosSlice";

export default function Recibos(){
    const recibos = useSelector(selectRecibos);

    return(
        <div className="seccion-recibos">
            <h2 className="titulo-seccion">Movimientos</h2>
            <hr></hr>
            <div className="contenedor-recibos">
                {
                    recibos[0] ?
                    recibos.map(recibo => {
                        return(
                            <div key={recibo.id} className="recibo">
                                <div>
                                    <h3 className="recibo-cat">{recibo.cat}</h3>
                                    <p className="recibo-fecha">{recibo.fecha}</p>
                                </div>
                                <div className="recibo-monto">
                                    <p style={recibo.cond ? {color:'#00a100'} : {color:'#d92424'}}>{`$${(recibo.monto).toFixed(2)} mxn.`}</p>
                                </div> 
                            </div>
                        )
                    }) : <p>NO HAY MOVIMIENTOS RECIENTES</p>
                }
            </div>
        </div>
    )
}