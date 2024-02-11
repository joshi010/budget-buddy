import React from "react";
import Recibos from "../Features/recibos/recibos";
import Dinero from "../Features/dinero/dinero";
import Gastos from "../Features/gastos/gastos";
import Presupuesto from "../Features/presupuestos/presupuesto";

function App() {
  return (
    <>
      <nav>BudgetBuddy</nav>
      <div className="App">
        <Recibos />
        <Dinero />
        <Presupuesto />
        <Gastos />
      </div>
    </>
  );
}

export default App;
