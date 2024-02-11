import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectInicial, selectRestante, selectIngresos, selectTipo } from "./dineroSlice";
import Forms from "../../components/forms";
import FormsText from "../../components/formsText";

export default function Dinero(){
    const inicial = useSelector(selectInicial);
    const restatne = useSelector(selectRestante);
    const fuentes = useSelector(selectIngresos);
    const tipo = useSelector(selectTipo);
    const [go, setGo] = useState(false);
    const [ir, setIr] = useState(false);
    return(
        <div className="seccion-dinero">
            <div>
                <h2 className="titulo-seccion">Mi Dinero</h2>
                <div className="contenedor-dineros">
                    <div className="montos">
                        <p>Dinero Acumulado</p>
                        <p>{`$${inicial.toLocaleString("en-us")} MXN.`}</p>
                    </div>
                    <div className="montos">
                        <p>Dinero Restante</p>
                        <p>{`$${restatne.toLocaleString("en-us")} MXN.`}</p>
                    </div>
                    <hr></hr>
                </div>
            </div>
            <div className="fuentes-dinero">
                <div className="sub-titulo">
                    <h4>Fuentes de Ingreso</h4>
                    <button className="porcentajes">Ver Porcentajes</button>
                </div>
                {
                    Object.values(fuentes).map(fuente => {
                        return(
                            <div key={fuente.id} className="dineros">
                                <p>{fuente.cat}</p>
                                <p>{`$${fuente.ing.toLocaleString("en-us")} MXN.`}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className="mid-stats">
                <p>Bancos: {`$${(tipo.bancos.toLocaleString("en-us")).toLocaleString()} MXN.`}</p>
                <p>Efectivo: {`$${tipo.efectivo.toLocaleString("en-us")} MXN.`}</p>
            </div>
            <div className="low-row">
                {
                    ir ? <FormsText action="ing" name="Editar Fuentes" cancel={ir} setcancel={setIr}/> : !go ? <button id="fill"
                    onClick={() => setIr(!ir)}>Editar Fuentes</button> : null
                }
                {
                    go ? <Forms action='ing' name={'Ingresar'} class={'low-row'} cancel={go} setcancel={setGo} /> : !ir ? <button 
                    id="ingreso" onClick={() => setGo(!go)}>Ingresar</button> : null
                }
            </div>
        </div>
    )
}