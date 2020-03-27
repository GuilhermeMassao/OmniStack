import React,{useState} from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {FiCornerDownLeft} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api'

export default function NewIncident(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const ong_Id = localStorage.getItem('ongId');
    const history = useHistory();
     const newIncidentHandler = async (e)=> {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }
        try{
            await api.post('incidents',data,{
                headers:{
                    Authorization: ong_Id,
                }
            })
            history.push('/profile');
        }catch(e){
            alert('erro ao cadastrar o caso.')
        }
    }
    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImg} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>Descreva o caso detalgadamente para encontrar um Herói resolver isso.</p>

                <Link className="back-link"  to="/profile">
                    <FiCornerDownLeft size={16} color='#e02041'/>
                    Voltar para Home
                </Link>
            </section>
            <form onSubmit={newIncidentHandler}>
                <input type="text" 
                placeholder='Título do caso'
                value={title}
                onChange={x=>setTitle(x.target.value)}
                />
                <textarea type="text" 
                placeholder='Descrição'
                value={description}
                onChange={x=>setDescription(x.target.value)}
                />
                <input type="text" 
                placeholder='Valor em reais'
                value={value}
                onChange={x=>setValue(x.target.value)}
                />

                <button className="button" type='submit'>Cadastrar</button>
            </form>
        </div>
    </div>
    );
}