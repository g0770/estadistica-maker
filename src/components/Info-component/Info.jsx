import { useState } from 'react'
import "./Info.css"

function Info({Tabla}) {
  
  return (
    <>
      <div className='InfoAdicional'>
        <p><strong>{"Media (x̄)"}</strong>: {Tabla["Media"]}</p>
        <p><strong>{"Varianza (ς^2)"}</strong>: {Tabla["Varianza"]}</p>
        <p><strong>{"Desviacion (ς)"}</strong>: {Tabla["Desviacion"]}</p>
      </div>
      {Tabla["Intervalos"] ? (
        <div className='InfoAdicional Intervalos'>
          <p><strong>{"Amplitud (A)"}</strong>: {Tabla["IntervalosInfo"]["Amplitud"]}</p>
          <p><strong>{"Numero de clases (Nc)"}</strong>: {Tabla["IntervalosInfo"]["NumeroDeClases"]}</p>
          <p><strong>{"Recorrido (Re)"}</strong>: {Tabla["IntervalosInfo"]["Recorrido"]}</p>
        </div>
      ) : null}
      
      <div className='DatosOriginales'>
        <label htmlFor="DatosSinOrdenar">Datos sin ordenar: </label>
        <textarea name="DatosSinOrdenar" id="" value={Tabla["VariablesLimpias"].join()}></textarea>
        <label htmlFor="DatosOrdenados">Datos ordenados: </label>
        <textarea name="DatosOrdenados" id=""value={Tabla["VariablesLimpiasAcomodadas"].join()}></textarea>
      </div>
    </>
  )
}

export default Info
