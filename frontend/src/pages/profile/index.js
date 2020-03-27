import React,{useEffect, useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'

import './styles.css';

import logoImg from '../../assets/logo.svg'

export default function Profile(){
    const history = useHistory();
    const [incidents,setIncidents] = useState([]);

    const ong_Id = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')

    useEffect(()=>{
        api.get('profile',{
            headers:{
                Authorization:ong_Id,
            }
        }).then(response=>{
            setIncidents(response.data.incidents);
        })
    },[ong_Id]);
    //primeiro parametro: função a ser executado. Segundo parametro: quando a função deve ser executada

    async function DeleteIncidentHandler(id){
        try{
           await api.delete(`incidents/${id}`,{
                headers:{
                    Authorization: ong_Id
                }
            })
            setIncidents(incidents.filter(x=>x.id != id))
        }catch(e){
            alert('erro ao deletar o caso')
        }
    }

    function logoutHandler(){
        localStorage.clear();
        history.push('/')
    }

    //parenteses para retornar JSX automaticamente ou {return()} linha 43
    return (
        
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, APAD</span>

                <Link className='button' to='/incidents/new'>Cadastrar novo incidente</Link>
                <button onClick={logoutHandler} type='button'>
                    <FiPower size = {18} color = '#E02041'></FiPower>
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(x => (
                <li key={x.id}>
                    <strong>CASO:</strong>
                    <p>{x.title}</p>

                    <strong>Descrição</strong>
                    <p>{x.description}</p>
                    
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(x.value) }</p>

                    <button type='button' onClick={()=>{DeleteIncidentHandler(x.id)}}>
                        <FiTrash2 size={20} color='#a8a8b3'/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}