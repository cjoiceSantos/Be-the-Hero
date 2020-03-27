import React, {useEffect, useState} from 'react';

import './styles.css';
import logo from '../../assets/logo.svg';
 
import  Link  from 'react-router-dom/Link';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';


export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

 
    useEffect( 
        () => { 
            api.get('profile', {
                headers: { Authorization: ongId}
            }).then(response => setIncidents(response.data)); 
        }
        , [ongId]
    );

    async function handleDeleteIncident(id){
        console.log(id);
        try {
            await api.delete(`incidents/${id}`, 
                { headers : { 
                    Authorization: ongId }
                });
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (err){
            alert("Erro ao tentar deletar o caso.");
        }
        
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt = "Be the Hero"/>
                <span> Bem vinda, {ongName} </span>
                <a> </a>
                <Link className="button" to="/incidents/new"> 
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick= {handleLogout}> <FiPower size={18} color="#E02041"/> </button>
            </header>

            <h1> Casos cadastrados </h1>
            <ul>
                {
                    incidents.map( incident => (
                        <li key = { incident.id } >
                            <strong> Caso: </strong>
                            <p> { incident.title } </p>
                            
                            <strong> Descrição </strong>
                            <p> {incident.description} </p>
                            
                            <strong> Valor: </strong>
                            <p> 
                                { 
                                Intl.NumberFormat('pt-BR',{ style : 'currency', currency: 'BRL'}).format(incident.value)
                                } 
                            </p>

                            <button type="button" onClick = { () => handleDeleteIncident(incident.id)}> 
                                <FiTrash2 size={20} color = "#a8a8b3"/>
                            </button>
                        </li> 
                    ))
                }
            </ul>

        </div>
    );
}
