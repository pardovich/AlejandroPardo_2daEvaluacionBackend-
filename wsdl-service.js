const express = require('express');
const soap = require('soap');
const axios = require('axios');
const app = express();
const port = 3002;

// Definir el servicio SOAP
const service = {
  InfografiaService: {
    InfografiaPort: {
      getInfografiaStats: async function (args, callback) {
        try {
          // Consumir el endpoint de infografías
          const response = await axios.get('http://localhost:3001/infografias');
          const infografias = response.data;

          if (infografias.length === 0) {
            return callback(null, {
              total: 0,
              avgLength: null,
            });
          }

          const total = infografias.length;
          const avgLength = infografias.reduce((sum, infografia) => sum + infografia.texto.length, 0) / total;

          return callback(null, {
            total,
            avgLength: avgLength.toFixed(2),
          });
        } catch (error) {
          console.error('Error obteniendo datos:', error);
          return callback(error);
        }
      },
    },
  },
};

// Definir el archivo WSDL
const xml = `
<definitions name="InfografiaService" xmlns="http://schemas.xmlsoap.org/wsdl/"
xmlns:tns="http://example.com/InfografiaService" xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/">
  <types>
    <xsd:schema>
      <xsd:element name="getInfografiaStatsRequest" type="xsd:string"/>
      <xsd:element name="getInfografiaStatsResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="total" type="xsd:int"/>
            <xsd:element name="avgLength" type="xsd:float"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>
  <message name="getInfografiaStatsRequest">
    <part name="request" type="xsd:string"/>
  </message>
  <message name="getInfografiaStatsResponse">
    <part name="response" type="tns:getInfografiaStatsResponse"/>
  </message>
  <portType name="InfografiaPortType">
    <operation name="getInfografiaStats">
      <input message="tns:getInfografiaStatsRequest"/>
      <output message="tns:getInfografiaStatsResponse"/>
    </operation>
  </portType>
  <binding name="InfografiaBinding" type="tns:InfografiaPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="getInfografiaStats">
      <soap:operation soapAction=""/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  <service name="InfografiaService">
    <port name="InfografiaPort" binding="tns:InfografiaBinding">
      <soap:address location="http://localhost:${port}/wsdl"/>
    </port>
  </service>
</definitions>`;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servicio WSDL corriendo en http://localhost:${port}/wsdl`);
});

soap.listen(app, "/wsdl", service, xml);
