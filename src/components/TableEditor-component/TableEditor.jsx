import { useState } from 'react'
import "./TableEditor.css"

function TableEditor({CambiarTabla}) {
  

  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
  }

  const HandleSubmitInformation = (e) => {
    e.preventDefault()

    //Variables de las cuales guardaremos los datos
    let ValoresGenerados = []
    let ValoresGeneradosAcomodados = []
    let FrecuenciasAbsGuardadas = []
    let FrecuenciasRelGuardadas = []
    let FrecAcumGuardadas = [0]
    let FrecAcumRelGuardadas = [0]
    let Angulos = []
    let SumMedia = []
    let Media = 0
    let SumVarianza = []
    let Varianza = 0

    const min = parseInt(e.target.min.value) || 1
    const max = parseInt(e.target.max.value) || 5
    const decimals = parseInt(e.target.decimals.value) || 2
    const LongitudValores = parseInt(e.target.longitud.value) || 1

    //Creacion y limpieza de los valores
    for (let i = 1; i <= LongitudValores; i++) {
      ValoresGenerados.push(generateRandomInteger(min, max))
    }
    ValoresGeneradosAcomodados = ValoresGenerados.sort((n1,n2) => n1 - n2)
    let ValoresSinRepeticion = uniq(ValoresGenerados).sort((n1,n2) => n1 - n2)

    //Calculo de Frecuencia Absoluta y Frecuencia Relativa
    ValoresSinRepeticion.forEach(numero => {
      FrecuenciasAbsGuardadas.push(0)
      ValoresGenerados.forEach(numrepetido => {
        numero == numrepetido ? FrecuenciasAbsGuardadas[FrecuenciasAbsGuardadas.length - 1] += 1: null
      })
    })
    FrecuenciasAbsGuardadas.forEach(fa => {
      FrecuenciasRelGuardadas.push(parseFloat((fa/LongitudValores).toFixed(decimals)))
    })
    

    //Calculo de Frecuencia Acumulada y Frecuencia Relativa Acumulada
    FrecuenciasAbsGuardadas.forEach(fa => {
      FrecAcumGuardadas.push((FrecAcumGuardadas[FrecAcumGuardadas.length - 1])+fa)
    })
    FrecAcumGuardadas.splice(0,1)

    FrecuenciasRelGuardadas.forEach(fr => {
      FrecAcumRelGuardadas.push(parseFloat((FrecAcumRelGuardadas[FrecAcumRelGuardadas.length - 1] + fr).toFixed(decimals)))
    })
    FrecAcumRelGuardadas.splice(0,1)
    
    //Calculo de los angulos
    FrecuenciasRelGuardadas.forEach(fr => {
      Angulos.push(parseFloat((fr * 360).toFixed(decimals)))
    })

    //Calculo de la Sumatoria Media y la Media
    ValoresSinRepeticion.forEach((valor,indice) => {
      let TempMedia = parseFloat((valor * FrecuenciasRelGuardadas[indice]).toFixed(decimals))
      SumMedia.push(TempMedia)
      Media += TempMedia
    });
    

    //Calculo de la Sumatoria Varianza, Varianza y Desviacion
    ValoresSinRepeticion.forEach((valor,indice) => {
      let TempVar = parseFloat((((valor - Media) * (valor - Media)) * FrecAcumGuardadas[indice]).toFixed(decimals));
      SumVarianza.push(TempVar)
      Varianza += TempVar
    });
    Varianza = Varianza / LongitudValores //ACA CUANDO HAGA LO DE INTERVALOS HACERLO -1

    let Desviacion = Math.sqrt(Varianza)

    // Limpieza de decimales
    Media = parseFloat(Media.toFixed(decimals));
    Varianza = parseFloat(Varianza.toFixed(decimals));
    Desviacion = parseFloat(Desviacion.toFixed(decimals));

    // Muestra para debug
    console.log(ValoresGenerados)
    console.log("X: "+ValoresSinRepeticion)
    console.log("FA: "+FrecuenciasAbsGuardadas)
    console.log("FR: "+FrecuenciasRelGuardadas)
    console.log("FAC: "+FrecAcumGuardadas)
    console.log("FRAC: "+FrecAcumRelGuardadas)
    console.log("ANGULOS: "+Angulos)
    console.log("X*FR: "+SumMedia)
    console.log("MEDIA (X con linea arriba): "+Media)
    console.log("(X-MEDIA)^2 * FA: "+SumVarianza)
    console.log("VARIANZA: "+Varianza)
    console.log("DESVIACION: "+Desviacion)

    // Seteo de la tabla

    const NewTabla = {
      Muestra: LongitudValores,
      Variables: ValoresSinRepeticion,
      VariablesLimpias: ValoresGenerados,
      VariablesLimpiasAcomodadas: ValoresGeneradosAcomodados,
      FrecuenciasAbsolutas: FrecuenciasAbsGuardadas,
      FrecuenciasRelativas: FrecuenciasRelGuardadas,
      FrecuenciasAcumuladas: FrecAcumGuardadas,
      FrecuenciasRelativasAcumuladas: FrecAcumRelGuardadas,
      SumatoriaMedia: SumMedia,
      Media: Media,
      SumatoriaVarianza: SumVarianza,
      Varianza: Varianza,
      Desviacion: Desviacion,
      Angulos: Angulos
    }

    CambiarTabla(NewTabla)
  }

  return (
    <>
      <form onSubmit={HandleSubmitInformation}>
        <div className='Values'>
          <input type="number" name='longitud' min={1} placeholder='value amount' />
          <input type="number" name='min' min={1} placeholder='min value' />
          <input type="number" name='max' min={1} placeholder='max value' />
          <input type="number" name='decimals' min={1} placeholder='decimals' />
        </div>
        <button className='SubmitButton' type='submit' >submit</button>
      </form>
    </>
  )
}

export default TableEditor
