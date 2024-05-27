import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [presion, setPresion] = useState('');
  const [temporada, setTemporada] = useState('3');
  const [puntoRocio, setPuntoRocio] = useState('2');
  const [humedad, setHumedad] = useState('1');
  const [temperatura, setTemperatura] = useState('4');
  const [dirViento, setDirViento] = useState('3');
  const [velViento, setVelViento] = useState('4');
  const [precipitacion, setPrecipitacion] = useState('5');
  const [precipitacionAcum, setPrecipitacionAcum] = useState('5');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [hour, setHour] = useState('');
  const [resultado, setResultado] = useState({ resultado: null });
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/modelo', {
        presion,
        temporada,
        puntoRocio,
        humedad,
        temperatura,
        dirViento,
        velViento,
        precipitacion,
        precipitacionAcum,
        year,
        month,
        day,
        hour,
      });

      if (response.data.error) {
        setError(response.data.error);
        setResultado(null);
      } else {
        setResultado({ resultado: response.data.resultado });
        setError(null);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('unable to calculate the result');
      }
      setResultado(null);
    }
  };

  return (
    <div>
      <div className='container-method'>
        <div className='content-method'>
          <div className='form-container'>
            <form className='form' onSubmit={handleFormSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td><label htmlFor='presion'>PRESIÓN (hPa)</label></td>
                    <td><input type='number' id='presion' value={presion} onChange={(e) => setPresion(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='temporada'>TEMPORADA</label></td>
                    <td>
                      <select id='temporada' value={temporada} onChange={(e) => setTemporada(e.target.value)}>
                        <option value="1">Invierno</option>
                        <option value="2">Otoño</option>
                        <option value="3">Primavera</option>
                        <option value="4">Verano</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='puntoRocio'>PUNTO DE ROCÍO (°C)</label></td>
                    <td><input type='number' id='puntoRocio' value={puntoRocio} onChange={(e) => setPuntoRocio(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='humedad'>HUMEDAD (%)</label></td>
                    <td><input type='number' id='humedad' min="0" max="100" value={humedad} onChange={(e) => setHumedad(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='temperatura'>TEMPERATURA (°C)</label></td>
                    <td><input type='number' id='temperatura' value={temperatura} onChange={(e) => setTemperatura(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='dirViento'>DIRECCIÓN VIENTO</label></td>
                    <td>
                      <select id='dirViento' value={dirViento} onChange={(e) => setDirViento(e.target.value)}>
                        <option value="1">NE</option>
                        <option value="2">NW</option>
                        <option value="3">SE</option>
                        <option value="4">SW</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td><label htmlFor='velViento'>VELOCIDAD VIENTO (m/s)</label></td>
                    <td><input type='number' id='velViento' value={velViento} onChange={(e) => setVelViento(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='precipitacion'>PRECIPITACIÓN (mm)</label></td>
                    <td><input type='number' id='precipitacion' value={precipitacion} onChange={(e) => setPrecipitacion(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='precipitacionAcum'>PRECIP. ACUMULADA (mm)---</label></td>
                    <td><input type='number' id='precipitacionAcum' value={precipitacionAcum} onChange={(e) => setPrecipitacionAcum(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='year'>AÑO</label></td>
                    <td><input type='number' id='year' value={year} onChange={(e) => setYear(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='month'>MES</label></td>
                    <td><input type='number' id='month' min="1" max="12" value={month} onChange={(e) => setMonth(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='day'>DÍA</label></td>
                    <td><input type='number' id='day' min="1" max="31" value={day} onChange={(e) => setDay(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td><label htmlFor='hour'>HORA</label></td>
                    <td><input type='number' id='hour' min="0" max="23" value={hour} onChange={(e) => setHour(e.target.value)} /></td>
                  </tr>
                </tbody>
              </table>
              <button type='submit' style={{ color: '#ff0000' }}>預測PM2.5</button>
            </form>
          </div>
          <div className='result' style={{ marginTop: '20px' }}>
            {error && <div className='error-message'>Error: {error}</div>}
            {resultado !== null && <div className='message' style={{ color: 'yellow', fontSize: '20px', padding: '5px', fontWeight: 'bold' }}>PM 2.5 預測器: {resultado.resultado} µg/m³</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
