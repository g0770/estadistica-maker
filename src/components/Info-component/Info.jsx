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
