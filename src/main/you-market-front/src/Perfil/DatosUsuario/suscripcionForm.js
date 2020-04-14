import React, { useCallback, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './styles.css';
import Header from '../../Header';
import Navegacion from '../Navegacion';
import ListaSuscripciones from '../../Registro/suscripciones';
import {Card} from 'primereact/card';
import { PayPalButton } from "react-paypal-button-v2";

function SuscripcionForm() {

    const suscripcion ={
        id: Number,
        dietista: Boolean,
        envios: Number,
        nombre: String,
        precio: Number
    }
    let history = useHistory();


    return (
        <div>
            <Header />
            <Navegacion />
            <Card title="Modificación de la suscripción" subTitle="Seleccione la suscripción a la que desea cambiar" style={{ margin: 20 }}>
                

                    <div className="row">
                        <span className="p-float-label" className="span">
                            <label className="label" >Tipo de suscripción: </label>
                            <ListaSuscripciones>

                            </ListaSuscripciones>
                        </span>

                    </div>
                    <PayPalButton
                        amount={20}
                        onSuccess={(suscripcion) => {
                            
                            suscripcion.id = document.getElementById('selectSuscripciones').value
                            setTimeout(() => {
                                fetch('suscripcion/update', {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json',
                                        'Authorization': 'Bearer ' + localStorage.getItem('auth')
                                    },
                                    method: 'POST',
                                    body: JSON.stringify(suscripcion, null, 1)
                                }).then(function (response) {
                                    console.log("respuesta")
                                    console.log(response);
                                }).then(() => {
                                    console.log("redirección")
                                    history.push('/datos-perfil')
                                })
                            }, 400);
                        }}

                        options={{
                            clientId: "AQ1wSRRux5eVDHDZia2gH5NfFd_dO2-mooYqs-CdF3E53DIHclXqJlDI_2I2vtfIeQi5qVQTciRnOS9Y",
                            currency: "EUR"
                        }}
                    />
               

            </Card>
        </div>
    );
}
export default SuscripcionForm;