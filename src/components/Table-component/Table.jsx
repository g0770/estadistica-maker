import { useState } from 'react'
import "./Table.css"

function Table({Tabla}) {
  
  return (
    <>
      <table>
        <thead>
            <tr>
                <td>X</td>
                {Tabla["Intervalos"] ? (<td>Mc</td>) : null}  
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
                {Tabla["Intervalos"] ? 
                  i == (Tabla["Variables"].length-1) ? (<td>{"["+valor[0]+";"+valor[1]+"]"}</td>) : (<td>{"["+valor[0]+";"+valor[1]+")"}</td>)
                :
                  (<td>{valor}</td>)
                }
                {Tabla["Intervalos"] ? <td>{Tabla["MarcasDeClase"][i]}</td> : null}  
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
