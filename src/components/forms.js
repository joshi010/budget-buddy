import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFuente, addIngreso, selectIngresos } from "../Features/dinero/dineroSlice";
import { addRecibo } from "../Features/recibos/recibosSlice";

export default function Forms(props){
    const dispatch = useDispatch();
    const ingresos = useSelector(selectIngresos);
    const [value, setValue] = useState();
    const [textVal, setTextVal] = useState("");
    const [bool, setBool] = useState(true);
    let d = new Date();
    const dateString = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`


    const handleIngreso = (e) => {
        e.preventDefault();
        const id = e.target[props.action].value;
        const tipo = e.target.lel.value;
        dispatch(addIngreso({ing: value, id:id, tipo:tipo}))
        dispatch(addRecibo({id:id, cat: ingresos[id].cat, fecha: dateString, cond:true, monto:value}))
        props.setcancel(!props.cancel)
        setValue(null);
    }

    const handleFuenteGasto = (e) => {
        e.preventDefault();
        const tipo = e.target.lel.value;
        const id = Date.now();
        dispatch(addFuente({id:id, cat: textVal}));
        dispatch(addIngreso({ing: value, id:id, tipo:tipo}));
        props.setcancel(!props.cancel)
        setValue(null);
        setTextVal("");
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.setcancel(!props.cancel)
    }

    return(
        <div className="pop-up">
            <h2>{props.name}</h2>
            <form className="forms-1" onSubmit={props.action == 'ing' && !bool ? handleFuenteGasto : handleIngreso }>
                <input type="number" id="monto" placeholder="Monto" step={0.01} min={1} required value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
               {
                    props.action == 'ing' && bool ? 
                    <select id="selecto" name={props.action} required>
                        {
                            Object.values(ingresos).map(ingreso => {
                                return(
                                    <option value={ingreso.id}>{ingreso.cat}</option>
                                )
                            })
                        }
                    </select>
                    : <input id="selecto" className="grid-2-5" type="text" placeholder="Nueva Fuente de Ingreso" value={textVal} onChange={(e) => setTextVal(e.currentTarget.value)} required/>
                }
                <div className="grid-2-5 hibrid-button" onClick={() => setBool(!bool)}>
                    + Agregar Fuente
                </div>
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