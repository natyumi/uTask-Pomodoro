import React, {useState} from 'react'
import './../css/Form.css'
import {Link, useHistory} from 'react-router-dom'
import Message from './Message'
import './button'

//import api from '../services/api';
const Form = (props) => {
    const history = useHistory();

    const [user, setUser] = React.useState("");
    const [pw, setPw] = React.useState("");

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    function handleUserChange(e){
        setUser(`${e.target.value}`)
    }
    function handlePwChange(e){
        setPw(`${e.target.value}`)
    }

    function handleSubmit(e) {
        e.preventDefault();

        setError(false);
        
        if(!validate(user, pw)) {
            setError(true);
            return;
        }

        // login efetuado com sucesso
        setSuccess(true);
        setTimeout(() => history.push('/pomodoro'), 1500);
    }

    function validate(user, pass) {
        if(user === 'errado')
            return false;

        if(!(user.trim()) || !(pass.trim()))
            return false;
        
        console.log(user, pass);

        return true;
    }


//HTML
    return (
        <form onSubmit={handleSubmit}>

            <div>
                <h2 className = "Bemvindo">
                    {props.h2}
                </h2>

                <label className = "labelLogin">

                    {props.label1}

                </label>

                <input className = "caixaLogin" onChange={handleUserChange} value={user} placeholder="   Seu login..."/>

                <label className = "labelSenha">

                    {props.label2}

                </label>

                <input className = "caixaSenha" type = "password" onChange={handlePwChange} value={pw} placeholder="   Sua senha..."/>

                <button className="button" type = "submit"  value = "disabled" disabled>

                    {props.btnText}

                </button>

                <p className = "primeiravez">

                    {props.p}
                    
                </p>

                <Link className = "linkcadastrar" to = "/cadastro">

                    {props.btnText2}

                </Link>

            </div>

            { error && <Message status="error" title="Oops..." msg="Ocorreu um erro, tente novamente" /> }

            { success && <Message status="success" title="Wow" msg="Sucesso!" /> }

        </form>
    )


}

export default Form;
