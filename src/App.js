import React, {useState, useEffect} from 'react';
import InputMask from "react-input-mask";
import axios from 'axios'; 
import './App.css';




function App() {
  
  //Mascara para os campos de Telefone e CPF//
  const Input = (props) => {
    return <InputMask mask="(xx)xxxxx-xxxx" value={props.value} onChange={props.onChange} {...props}> 
    {(inputProps)=> <input {...inputProps}/>}
    </InputMask>;}

  //Requisação da API Pais e Cidade//
  const [posts, setPosts] = useState([])
  const [posts2, setPosts2] = useState([])

  //API País//
  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/country")
    .then((response) =>{ 
      console.log(response.data)
      setPosts(response.data, console.log(posts))
    })

    .catch(() => {
      console.log("Falha")
    })


  }, []);

  //API Cidade//
  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/city")
    .then((response2) =>{ 
      console.log(response2.data)
      setPosts2(response2.data, console.log(posts2))
    })

    .catch(() => {
      console.log("Falha2")
    })


  }, []);

  const [formValues, setFormValues] = useState({});
 
  //Verificação de input//
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues({...formValues, [name]: value });
    console.log('*** formValues', formValues);
  };
    
  //Enviar os dados validados//
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(' *** handleSubmit', data)
  };
  //formulario e selecionaveis//
    return (
    <form onSubmit={handleSubmit}>
    <input type="text" name="nome" placeholder="Nome" onChange={handleInputChange} value={formValues.nome || ''}/>
    <input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={formValues.email || ''}/>
    <InputMask placeholder="Telefone" mask="(99)99999-9999" maskPlaceholder="(99)99999-9999" onChange={handleInputChange} value={formValues.telefone} />
    <InputMask placeholder="CPF" mask="999.999.999-99" maskPlaceholder="999.999.999-99" onChange={handleInputChange} value={formValues.cpf} />
    

    <select name="país">
        <option>Selecionar país</option>
        {posts.map((post, index)=>{ 
       return <option key={index} value={post.code}>{post.name_ptbr}</option>
      })} 
    </select>

    <select name="cidade">
        <option>Selecionar cidade</option>
        {posts2.map((posts2, index)=>{ 
       return <option key={index} value={posts2.country_code}>{posts2.name_ptbr}</option>
      })}
     </select>

    <button type="submit">Enviar</button>

</form> ) 
}

  
  
  
export default App;
