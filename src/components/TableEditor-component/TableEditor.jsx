import { useState } from 'react'
import "./TableEditor.css"

function TableEditor({CambiarTabla}) {
  const [Checkbox,SetCheckbox] = useState(false)

  function generateRandomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
  }

  function generateRandomFloat(min, max) {
    return (min + Math.random() * (max - min));
  }

  function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
  }

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      SetCheckbox(true)
    } else {
      SetCheckbox(false) // remove the value from the selected array
    }
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

    let IntervalosGuardados = []
    let MarcasDeClase = []
    let IntervalosInfo = {
      Recorrido: 0,
      RecorridoDatos: [0,0],
      NumeroDeClases: 0,
      Amplitud: 0
    }

    const min = parseInt(e.target.min.value) || 1
    const max = parseInt(e.target.max.value) || 5
    const decimals = parseInt(e.target.decimals.value) || 2
    const LongitudValores = parseInt(e.target.longitud.value) || 1
    const Intervalos = Checkbox || false

    //Intervalos (true primero)
    if(Intervalos) {
      //Creacion de los valores y limpieza de los mismos
      for (let i = 1; i <= LongitudValores; i++) {
        ValoresGenerados.push(generateRandomFloat(min, max).toFixed(decimals))
      }
      ValoresGeneradosAcomodados = ValoresGenerados.sort((n1,n2) => n1 - n2)

      //Calculo de recorrido amplitud numerodeclases
      const ReMin = parseFloat(ValoresGeneradosAcomodados[0])
      const ReMax = parseFloat(ValoresGeneradosAcomodados[ValoresGeneradosAcomodados.length-1])
      const Re =  parseFloat((ReMax-ReMin).toFixed(decimals))
      let NumClases = 0
      if (LongitudValores >= 50) {
        NumClases = parseFloat((Math.log(LongitudValores) / Math.log(2)) + 1)
      } else {
        NumClases = parseFloat(Math.sqrt(LongitudValores))
      }
      NumClases = Math.round(NumClases)
      let Ampl = parseFloat((Re / NumClases).toFixed(decimals))

      //carga de datos para utilizarlos a futuro
      IntervalosInfo = {
        Recorrido: Re,
        RecorridoDatos: [ReMin,ReMax],
        NumeroDeClases: NumClases,
        Amplitud: Ampl
      }

      //generacion de intervalos
      const start = parseFloat(IntervalosInfo["RecorridoDatos"][0])
      const finish = parseFloat(IntervalosInfo["RecorridoDatos"][1])
      const amplitud = IntervalosInfo["Amplitud"]
      let acum = parseFloat((start+amplitud).toFixed(decimals))
      let temp = 0
      IntervalosGuardados = [[start,acum]]
      for (let i = 1; i < IntervalosInfo["NumeroDeClases"]; i++) {
        temp = parseFloat(IntervalosGuardados[i-1][1])
        acum = parseFloat((temp + amplitud).toFixed(decimals))
        IntervalosGuardados.push([temp,acum])
      }
      while (IntervalosGuardados[IntervalosGuardados.length-1][1] < finish) {
        console.log("Created new clase")
        temp = parseFloat(IntervalosGuardados[IntervalosGuardados.length-1][1])
        acum = parseFloat((temp + amplitud).toFixed(decimals))
        IntervalosGuardados.push([temp,acum])
        IntervalosInfo["NumeroDeClases"] += 1
      }

      //Marcas de clase
      IntervalosGuardados.forEach(intervalo => {
        MarcasDeClase.push(parseFloat(((intervalo[0]+intervalo[1])/2).toFixed(decimals)))
      })

      //frecuencia absolutas y relativas
      IntervalosGuardados.forEach((intervalo,i) => {
        acum = 0
        ValoresGeneradosAcomodados.forEach(num => {
          if (i == IntervalosGuardados.length-1) {
            if (num >= intervalo[0] && num <= intervalo[1]) {
              acum += 1
            }
          } else {
            if (num >= intervalo[0] && num < intervalo[1]) {
              acum += 1
            }
          }
        })
        FrecuenciasAbsGuardadas.push(acum)
      })

      //frecuencias acumuladas absolutas y relativas
      FrecuenciasAbsGuardadas.forEach(fa => {
        FrecuenciasRelGuardadas.push(parseFloat((fa/LongitudValores).toFixed(decimals)))
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
      MarcasDeClase.forEach((valor,indice) => {
        let TempMedia = parseFloat((valor * FrecuenciasRelGuardadas[indice]).toFixed(decimals))
        SumMedia.push(TempMedia)
        Media += TempMedia
      });
      

      //Calculo de la Sumatoria Varianza, Varianza y Desviacion
      MarcasDeClase.forEach((valor,indice) => {
        let TempVar = parseFloat((Math.pow((valor - Media),2) * FrecuenciasAbsGuardadas[indice]).toFixed(decimals));
        SumVarianza.push(TempVar)
        Varianza += TempVar
      });
      Varianza = Varianza / (LongitudValores-1)

      let Desviacion = Math.sqrt(Varianza)

      // Limpieza de decimales
      Media = parseFloat(Media.toFixed(decimals));
      Varianza = parseFloat(Varianza.toFixed(decimals));
      Desviacion = parseFloat(Desviacion.toFixed(decimals));

      // Seteo de la tabla

      const NewTabla = {
        Muestra: LongitudValores,
        Variables: IntervalosGuardados,
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
        Angulos: Angulos,
        Intervalos: Intervalos,
        IntervalosInfo: IntervalosInfo,
        MarcasDeClase: MarcasDeClase
      }

      CambiarTabla(NewTabla)

    } else { //no intervalos

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
        let TempVar = parseFloat((Math.pow((valor - Media),2) * FrecuenciasAbsGuardadas[indice]).toFixed(decimals));
        SumVarianza.push(TempVar)
        Varianza += TempVar
      });
      Varianza = Varianza / LongitudValores

      let Desviacion = Math.sqrt(Varianza)

      // Limpieza de decimales
      Media = parseFloat(Media.toFixed(decimals));
      Varianza = parseFloat(Varianza.toFixed(decimals));
      Desviacion = parseFloat(Desviacion.toFixed(decimals));

      // Seteo de la tabla

      const NewTabla = {
        Muestra: LongitudValores,
        Variables:ValoresSinRepeticion,
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
        Angulos: Angulos,
        Intervalos : false,
      }

      CambiarTabla(NewTabla)
  }}

  return (
    <>
      <form onSubmit={HandleSubmitInformation}>
        <div className='Values'>
          <input type="number" name='longitud' min={1} placeholder='value amount' />
          <input type="number" name='min' min={1} placeholder='min value' />
          <input type="number" name='max' min={1} placeholder='max value' />
          <input type="number" name='decimals' min={1} placeholder='decimals' />
        </div>
        <div className='Settings'>
          <div>
            <label htmlFor="intervalos">Intervalos?</label>
            <input type="checkbox" onChange={handleCheckbox} name="intervalos"/>
          </div>
        </div>
        <button className='SubmitButton' type='submit' >submit</button>
      </form>
    </>
  )
}

export default TableEditor
