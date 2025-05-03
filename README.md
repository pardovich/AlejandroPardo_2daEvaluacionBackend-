
# Microservicio SOAP para Infografías

## Descripción General

Este microservicio SOAP proporciona estadísticas sobre las infografías, como el total de infografías y el promedio de la longitud del texto. Consume la API REST de infografías y expone estos datos en formato SOAP.

## Tecnologías Utilizadas
- Node.js
- Express
- SOAP
- Axios
- MongoDB

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tuusuario/microservicio-soap.git
    ```

2. Entra en la carpeta del proyecto:
    ```bash
    cd microservicio-soap
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Crea el archivo `.env` con la siguiente configuración:
    ```env
    API_URL=http://localhost:3001
    ```

5. Levanta el servidor SOAP:
    ```bash
    node server.js
    ```

## Uso

Una vez que el servidor esté activo, podrás acceder al servicio SOAP en `http://localhost:3002/wsdl`.

### Ejemplo de Solicitud SOAP:
    
```xml
<?xml version="1.0"?>
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
 xmlns:tns="http://example.com/InfografiaService">
  <SOAP-ENV:Header/>
  <SOAP-ENV:Body>
   <tns:getInfografiaStatsRequest/>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

### Respuesta Esperada:
```xml
<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/">
  <SOAP-ENV:Body>
    <getInfografiaStatsResponse>
      <total>5</total>
      <avgLength>48.00</avgLength>
    </getInfografiaStatsResponse>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

## Pruebas

### Pruebas realizadas:
- Solicitudes SOAP desde Postman.
- Validación de datos retornados.

## Autor
Proyecto realizado como parte de la evaluación de Tecnologías Web II.
