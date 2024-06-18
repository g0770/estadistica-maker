import { useState } from 'react'
import './App.css'

import TableEditor from './components/TableEditor-component/TableEditor'
import Table from './components/Table-component/Table'
import Info from './components/Info-component/Info'

function App() {

  const [DatosTabla,EditarDatosTabla] = useState({
    Muestra: 0,
    Variables: [],
    VariablesLimpias: [], //
    VariablesLimpiasAcomodadas: [], //
    FrecuenciasAbsolutas: [],
    FrecuenciasRelativas: [],
    FrecuenciasAcumuladas: [],
    FrecuenciasRelativasAcumuladas: [],
    SumatoriaMedia: [],
    Media: 0,// 
    SumatoriaVarianza: [],
    Varianza: 0,//
    Desviacion: 0,//
    Angulos: []
  })

  const CambiarTabla = (Tabla) => {
    EditarDatosTabla(Tabla)
  }
    

  return (
    <>
      <h1>Estadistica Maker</h1>

      <TableEditor CambiarTabla={CambiarTabla}/>
      <Table Tabla={DatosTabla}/>
      <Info Tabla={DatosTabla}/>

    </>
  )
}

export default App
