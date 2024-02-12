import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCategorias, selectPresupuesto } from "./presupuestoSlice";
import FormsText from "../../components/formsText";
import { selectInicial } from "../dinero/dineroSlice";

export default function Presupuesto(){
    const presupuesto = useSelector(selectPresupuesto);
    const categorias = useSelector(selectCategorias);
    const inicial = useSelector(selectInicial);
    const [go, setGo] = useState(false);
    const [ir, setIr] = useState(false);

    return(
    <div className="seccion-dinero">
        <div>
            <h2 className="titulo-seccion">Presupuesto</h2>
            <h2 id="gastos" style={inicial < presupuesto ? {color:'#d92424'} : null}>{`$${presupuesto.toLocaleString("en-us")} MXN.`}</h2>
        </div>
        <div className="fuentes-dinero">
            <div className="sub-titulo">
                <h4>Categorías Presupuestadas</h4>
            </div>
            {
                Object.values(categorias).map(categoria => {
                    return(
                        <div key={categoria.id} className="dineros">
                            <p>{categoria.cat}</p>
                            <p>{`$${Number(categoria.mont).toLocaleString("en-us")} MXN.`}</p>
                        </div>
                    )
                })
            }
        </div>
        <div className="low-row">
            {
                ir ? <FormsText action="presup" name="Editar Presupuesto" cancel={ir} setcancel={setIr}/> : !go ? <button id="fill"
                onClick={() => setIr(!ir)}>Editar a Presupuesto</button> : null
            }
        </div>
    </div>
    )
}