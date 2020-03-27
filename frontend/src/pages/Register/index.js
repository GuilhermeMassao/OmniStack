import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import {FiCornerDownLeft} from 'react-icons/fi';
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Register(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp,setWhatsApp] = useState('');
    const [city,setCity] = useState('');
    const [uf,setUf] = useState('');

    const history = useHistory();

    async function registerHandle(e){
        debugger;
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }
        try{
            const response = await api.post('ongs', data);
            alert(`Seu ID de acesso: ${response.data.id}`)
            history.push('/');
        }catch(e){
            alert('Erro ao cadastrar, por favor tente novamente.')
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu Cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link"  to="/register">
                        <FiCornerDownLeft size={16} color='#e02041'/>
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={registerHandle}>
                    <input type="text" value={name} onChange={x=> setName(x.target.value)} placeholder='Nome da ONG'/>
                    <input type="text" value={email} onChange={x=> setEmail(x.target.value)} placeholder='E-mail'/>
                    <input type="text" value={whatsapp} onChange={x=> setWhatsApp(x.target.value)} placeholder='WhatsApp'/>

                    <div className="input-group">
                    <input type="text" value={city} onChange={x=> setCity(x.target.value)} placeholder='Cidade'/>
                    <input type="text" value={uf} onChange={x=> setUf(x.target.value)} placeholder='UF' style = {{width:80}}/>
                    </div>

                    <button className="button" type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}