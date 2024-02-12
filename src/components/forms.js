import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngreso, selectIngresos } from "../Features/dinero/dineroSlice";
import { addRecibo } from "../Features/recibos/recibosSlice";

export default function Forms(props){
    const dispatch = useDispatch();
    const ingresos = useSelector(selectIngresos);
    const [value, setValue] = useState(0)

    const handleIngreso = (e) => {
        e.preventDefault();
        let d = new Date();
        const dateString = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
        const id = e.target[props.action].value;
        const tipo = e.target.lel.value;
        dispatch(addIngreso({ing: value, id:id, tipo:tipo}))
        dispatch(addRecibo({id:id, cat: ingresos[id].cat, fecha: dateString, cond:true, monto:value}))
        props.setcancel(!props.cancel)
        setValue(null);
    }

    const hanldeGasto = (e) => {
        e.preventDefault();
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.setcancel(!props.cancel)
    }

    return(
        <div className="pop-up">
            <h2>{props.name}</h2>
            <form className="forms-1" onSubmit={props.action == 'ing' ? handleIngreso : hanldeGasto }>
                <label for="monto">Monto</label>
                <input type="number" id="monto" placeholder="Monto" step={0.01} min={1} required value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
               {
                    props.action == 'ing' ? 
                    <select id="selecto" name={props.action}>
                        {
                            Object.values(ingresos).map(ingreso => {
                                return(
                                    <option value={ingreso.id}>{ingreso.cat}</option>
                                )
                            })
                        }
                    </select>
                    : null
                }
                <h3 id="text-text">Tipo</h3>
                <div className="radio-elements">
                    <input type="radio" id="efectivo" value="efectivo" name="lel" required/>
                    <label for="efectivo">Efectivo</label>
                </div>
                <div className="radio-elements">
                    <input type="radio" id="bancos" value="bancos" name="lel" required/>
                    <label for="bancos">Bancos</label>
                </div>
                <h3 id="text-text">Perioricidad</h3>
                <div className="radio-elements">
                    <input type="radio" id="periocidad" name="periocidad" value="mensual" required/>
                    <label for="periocidad">Fijo Mensual</label>
                </div>
                <div className="radio-elements">
                    <input type="radio" id="variabilidad" name="periocidad" value="variabilidad" required/>
                    <label for="variabilidad">Variable</label>
                </div>
                <button id="send">Realizar</button>
                <button id="cancel"  onMouseUp={handleCancel}>Cancelar</button>
            </form>
        </div>
    )
}