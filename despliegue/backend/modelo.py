import pandas as pd
import pickle as pk
import os


def modelo(year, month, day, hour, presion, temporada, puntoRocio, humedad, temperatura, dirViento, velViento, precipitacion, precipitacionAcum):
    data = {
        'year': year,
        'month': month,
        'day': day,
        'hour': hour,
        'DEWP': puntoRocio,
        'HUMI': humedad,
        'PRES': presion,
        'TEMP': temperatura,
        'Iws': velViento,
        'precipitation': precipitacion,
        'Iprec': precipitacionAcum,
        'NE': 0 if dirViento != 1 else 1,
        'NW': 0 if dirViento != 2 else 1,
        'SE': 0 if dirViento != 3 else 1,
        'SW': 0 if dirViento != 4 else 1,
        'Invierno': 0 if temporada != 1 else 1,
        'Otono': 0 if temporada != 2 else 1,
        'Primavera': 0 if temporada != 3 else 1,
        'Verano': 0 if temporada != 4 else 1,
    }
    print("Current working directory:", os.getcwd())

    # Creamos un DataFrame de pandas con los datos
    df = pd.DataFrame([data])
    print(5)
    # Cargamos el modelo desde el archivo .pickle
    with open("despliegue/backend/modelo.pickle", "rb") as f:
        modelo_cargado = pk.load(f)

    # Realizamos la predicción con el modelo cargado
    try:
        prediccion = modelo_cargado.predict(df)
        return round(prediccion[0], 3)
    except Exception as e:
        return f"Error al realizar la predicción: {str(e)}"
