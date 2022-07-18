import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable'

export default function Infoitem() {
    const [nome, setNome] = useState('');
    const [vnome, setVnome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [vdescricao, setVdescricao] = useState('');
    const [valor, setValor] = useState('');
    const [vvalor, setVvalor] = useState('');
    const [estado, setEstado] = useState('');
    const [vestado, setVestado] = useState('');
    const [categoria, setCategoria] = useState('');
    const [vcategoria, setVcategoria] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [vquantidade, setVquantidade] = useState('');
    const [vregistro, setVregistro] = useState('');

    const validar = () =>{
      setVnome('')
      setVdescricao('')
      setVvalor('')
      setVestado('')
      setVcategoria('')
      setVquantidade('')
      let error = false
      if (nome == ''){
        setVnome("Digite o nome do item")
        error = true
      }
      if (descricao == ''){
        setVdescricao("Digite a descrição do item")
        error = true
      }
      if (valor == ''){
        setVvalor("Digite o valor do item")
        error = true
      }
      if(estado == ''){
        setVestado("Digite o estado do item")
        error = true
      }
      if(categoria == ''){
        setVcategoria("Digite a categoria do item")
        error = true
      }
      if(quantidade == ''){
        setVquantidade("Digite a categoria do item")
        error = true
      }

      return !error
    }
    // https://upgrade-back-staging.herokuapp.com/product/register
    async function fetchMoviesJSON() {
      let usuario = "62c24f2e53b525876f3d731c"
      const response = await fetch('https://upgrade-back-staging.herokuapp.com/product/register',{
        method: 'POST',
        body: JSON.stringify({
          "name" : nome,
          "descrição" : descricao,
          "valor" : valor,
          "estado" : estado,
          "categoria" : categoria,
          "quantidade" : quantidade,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const teste = await response.json();
      return teste;
    }

    const salvar = () =>{
      if (validar()){
        console.log("manda pro back")
        fetchMoviesJSON().then(teste => {
          console.log(teste)
          console.log("pegou resposta")
          if(teste.confirm){
            console.log("Registrou")
            navigation.navigate("Home")
          }else{
            console.log("não Registrou")
            setVregistro("Não registrou")
          }
        });
      }
    }


 return (
    <View style={styles.containerLogo}>
        <Text style={styles.title1}>Informações do Item</Text>
        <Text style={styles.msgerro}>{vregistro}</Text>
        <Text style={styles.title}>Nome do Item *</Text>
        <TextInput
            placeholder="Nome do Item"
            onChangeText={setNome}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vnome}</Text>
        <Text style={styles.title}>Descrição do Item *</Text>
        <TextInput
            placeholder="Descrição do Item"
            onChangeText={setDescricao}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vdescricao}</Text>
        <Text style={styles.title}>Valor Do Item *</Text>
        <TextInput
            placeholder="Valor do Item"
            onChangeText={setValor}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vvalor}</Text>
        <Text style={styles.title}>Estado Do Item *</Text>
        <TextInput
            placeholder="Estado do Item"
            onChangeText={setEstado}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vestado}</Text>
        <Text style={styles.title}>Categoria Do Item *</Text>
        <TextInput
            placeholder="Categoria do Item"
            onChangeText={setCategoria}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vcategoria}</Text>
        <Text style={styles.title}>Quantidade *</Text>
        <TextInput
            placeholder="Quantidade"
            onChangeText={setQuantidade}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vquantidade}</Text>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => salvar()}>
        <Text style={styles.buttonText}>Registrar item</Text>
        </TouchableOpacity>

        </View>
  );
}

const styles = StyleSheet.create({
  containerLogo:{
    backgroundColor: '#E6E6E6',
    justifyContent: 'center',
    alignItems: 'center',

  },
  msgerro:{
    color:"red",
    fontSize: 16,
    alignSelf:'center',
  },
  buttonRegister:{
    backgroundColor: '#1E1E1E',
    marginTop: 10,
    borderRadius: 50,
    width: '45%',
    alignSelf: 'center'
  },
  buttonText:{
    color: '#E6E6E6',
    fontSize: 20,
    alignSelf: 'center',
  },
  title:{
    backgroundColor: '#E6E6E6',
    color: '#FF7851',
    marginTop: 10,
    fontSize: 16,
  },
  TextSenha:{
    backgroundColor: 'white',
    color: '#A3A3A3',
    borderRadius: 50,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  title1:{
    backgroundColor: '#E6E6E6',
    color: '#FF7851',
    fontSize: 25,
    fontWeight: '400'
  },
})