import React, { useState } from "react";
import { addFuente, selectIngresos, deleteFuente } from "../Features/dinero/dineroSlice";
import { useDispatch, useSelector } from "react-redux";
import { addCategoria, deleteCategoria, modifyCategoria, selectCategorias } from "../Features/presupuestos/presupuestoSlice";

export default function FormsText(props){
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [mont, setMont] = useState();
    const [bool, setBool] = useState(false);
    const ingresos = useSelector(selectIngresos);
    const categorias = useSelector(selectCategorias);
    const handleIngreso = (e) => {
        e.preventDefault();
        dispatch(addFuente({id:Date.now(), cat:value}))
        props.setcancel(!props.cancel);
        setValue("");
    }

    const hanldeGasto = (e) => {
        e.preventDefault()
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.setcancel(!props.cancel)
    }

    const handlePresupuesto = (e) => {
        e.preventDefault();
        dispatch(addCategoria({id:Date.now(), cat:value, mont: mont}));
        props.setcancel(!props.cancel);
        setValue("");
        setMont(0);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteFuente({id: e.target.lol.value}));
        props.setcancel(!props.cancel);
    }

    const handleModify = (e) => {
        e.preventDefault();
        if(Number(mont) === 0){
            dispatch(deleteCategoria({id: e.target.lel.value}));
        } else {
            dispatch(modifyCategoria({id: e.target.lel.value, mont: mont}))
        }
        props.setcancel(!props.cancel);
    }

    return(
        <div className="pop-up">
        <h2>{props.name}</h2>
        <form className="forms-1" onSubmit={props.action == 'ing' && bool ? handleDelete : props.action == 'presup' && bool ? handleModify : props.action == 'ing' ? handleIngreso : props.action == 'presup' ? handlePresupuesto : hanldeGasto }>
            <h3>{props.action == 'ing' ? "Añadir Fuente" : props.action == 'presup' ? "Categoría" : "Gasto"}</h3>
            <div className="radio-elements">
                <input type="checkbox" value={true} id="editar-categorias" onChange={() => setBool(!bool)}/>
                <label for="editar-categorias">Editar Categorias</label>
            </div>
            {
                !bool ? <input id={props.action == "ing" ? "text-text" : "shared-text"} type="text" required value={value} onChange={(e) => setValue(e.currentTarget.value)}/> : props.action == "ing" ? <select id="shared-text" name="lol">{Object.values(ingresos).map(ingreso => {return(<option key={ingreso.id} value={ingreso.id}>{ingreso.cat}</option>)})}</select> : <select id="shared-text" name="lel" onChange={(e) => setMont(Number(categorias[e.currentTarget.value].mont))}>{Object.values(categorias).map(categoria => {return(<option key={categoria.id} value={categoria.id}>{categoria.cat}</option>)})}</select>

            }
            {
                props.action == 'presup' ? <input type="number" placeholder="Monto" className="presup" step={0.01} min={bool ? 0 : 1} required value={mont} onChange={(e) => setMont(e.currentTarget.value)}/> : null
            }
            {
                props.action == 'presup' && !bool ? <><h3 id="text-text">Perioricidad</h3> <div className="radio-elements"><input type="radio" id="periocidad" name="periocidad" value="mensual" required/><label for="periocidad">Fijo Mensual</label></div>
                <div className="radio-elements"><input type="radio" id="variabilidad" name="periocidad" value="variabilidad" required/><label for="variabilidad">Variable</label></div></> 
            : null
            }
            <button id="send">{ bool && props.action == "ing" ? "Eliminar" : "Realizar"}</button>
            <button id="cancel"  onMouseUp={handleCancel}>Cancelar</button>
        </form>
    </div>
    )
}