from flask_cors import CORS
from flask import Flask, request, jsonify
from modelo import modelo

app = Flask(__name__)
CORS(app)

@app.route('/modelo', methods=['POST'])
def respuesta():
    data = request.get_json()
    print("hola")
    try:
        presion = float(data['presion'])
        temporada = int(data['temporada'])
        puntoRocio = float(data['puntoRocio'])
        humedad = float(data['humedad'])
        temperatura = float(data['temperatura'])
        dirViento = int(data['dirViento'])
        velViento = float(data['velViento'])
        precipitacion = float(data['precipitacion'])
        precipitacionAcum = float(data['precipitacionAcum'])
        year = int(data['year'])
        month = int(data['month'])
        day = int(data['day'])
        hour = int(data['hour'])
        
        # Aquí puedes agregar lógica para utilizar los nuevos campos si es necesario.
        print("hola")
        resultado = modelo(presion, temporada, puntoRocio, humedad, temperatura, dirViento, velViento, precipitacion, precipitacionAcum, year, month, day, hour)
        return jsonify({'resultado': resultado})

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400

if __name__ == '__main__':
    app.run(debug=True)
