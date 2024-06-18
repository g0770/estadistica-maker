import { useState } from 'react'
import "./Table.css"

function Table({Tabla}) {
  
  return (
    <>
      <table>
        <thead>
            <tr>
                <td>X</td>  
                <td>FA</td>  
                <td>FR</td>  
                <td>FAC</td>  
                <td>FRAC</td>  
                <td>α</td>  
                <td>X * FR</td>
                <td>{"(X - x̄)^2 * FA"}</td>
            </tr>
        </thead>
        <tbody>
            {Tabla["Variables"].map((valor, i) => (
                <tr key={i}>
                <td>{valor}</td>
                <td>{Tabla["FrecuenciasAbsolutas"][i]}</td>
                <td>{Tabla["FrecuenciasRelativas"][i]}</td>
                <td>{Tabla["FrecuenciasAcumuladas"][i]}</td>
                <td>{Tabla["FrecuenciasRelativasAcumuladas"][i]}</td>
                <td>{Tabla["Angulos"][i]}</td>
                <td>{Tabla["SumatoriaMedia"][i]}</td>
                <td>{Tabla["SumatoriaVarianza"][i]}</td>
                </tr>
            ))}
        </tbody>

      </table>
    </>
  )
}

export default Table
