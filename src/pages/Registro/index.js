import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, ScrollView, Image, ActivityIndicator} from 'react-native';
import 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

import {useNavigation} from '@react-navigation/native'
import { set } from 'react-native-reanimated';

const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 64;

export default function Registro(params) {
  // console.log(params.route.params.id);
    const userid = params.route.params.id
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [vimage, setVimage] = useState('');
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
    const [isLoading, setIsLoading] = useState(false);
    
    // função para pegar a imagem
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4,4],
        quality: 1,
      });
      // console.log(result);
      if (!result.cancelled) {
        setImage(result);
        
      }
    };

    // função para validar os formulários (precisa de algumas melhorias)
    const validar = () =>{
      setVnome('')
      setVdescricao('')
      setVvalor('')
      setVcategoria('')
      setVestado('')
      setVquantidade('')
      setVimage('')
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
      if(estado == '' || estado == null){
        setVestado("Digite o estado do item")
        error = true
      }
      if(categoria == '' || categoria == null){
        setVcategoria("Selecione a categoria do item")
        error = true
      }
      if(quantidade == ''){
        setVquantidade("Digite a categoria do item")
        error = true
      }
      if(image == null || image == ''){
        setVimage("Selecione uma imagem")
        error = true;
      } 

      return !error
    }

    // função para enviar os formulários para o back
    async function fetchMoviesJSON() {
      let result = image;
      let localUri = result.uri;
      var data = new FormData();
      data.append('file', {
        uri: localUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      
      let fodac = JSON.stringify({
        "title" : nome,
        "description" : descricao,
        "price" : valor,
        "condition" : estado,
        "class" : categoria,
        "amount" : quantidade,
        "userId" : userid,
      })

      data.append('info', fodac)

      const response = await fetch('https://upgrade-back-staging.herokuapp.com/product/teste',{
        method: 'POST',
        body: data,
        redirect: 'follow'
      });
      const teste = await response.json();
      return teste;
    }



    // função de envio de formulários se eles forem válidos
    const salvar = () =>{
      setIsLoading(true)
      if (validar()){
        // console.log("manda pro back")
        fetchMoviesJSON().then(teste => {
          // console.log("result: "+JSON.stringify(teste))
          // console.log("pegou resposta")
          if(teste.confirm){
            // console.log("Registrou")
            alert("Item Registrado")
            navigation.navigate("Home")
            setIsLoading(false)
          }else{
            // console.log("não Registrou")
            alert("Item Não Registrado")
            setVregistro("Não registrou")
            setIsLoading(false)
          }
        }).catch(e=>{
          setIsLoading(false)
          alert("Sem conexão com o servidor")
          setVregistro("Sem conexão com o servidor")
          // console.log(e)
        });;
      }else{
        setIsLoading(false)
      }
    }
    
    //função para tela de carregamento durante o envio dos formularios para aguardar a resposta
    const loading = () =>{
      if(isLoading){
        return(
        <View style={{ position: 'absolute', flex: 1, justifyContent: "center", alignItems: "center", zIndex: 999, height: '100%', width: '100%', backgroundColor: '#00000099' }}>
          <ActivityIndicator color={"#FF7851"} size={100}/> 
        </View>
        )
      }
    }
    
    return (
      <View style={{height: '100%'}}>
        {loading()}
        <ScrollView style={styles.container}>
          <View style={styles.containerview}>
          <LinearGradient 
            colors={['#1E1E1E', '#E6E6E6']}
            style={styles.linearGradient}
            start={{ x: 0, y: 0.9 }}
            >
              {/* <TouchableOpacity style={styles.goback} onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={35} color="#FF7851"/>
              </TouchableOpacity> */}
              <Text style={styles.title}> Registrar item para a Venda</Text>
            </LinearGradient> 
          </View>
          <View style={styles.containerLogo}>
            <Text style={styles.title1}>Informações do Item</Text>
            <Text style={styles.msgerro}>{vregistro}</Text>
            <Text style={styles.title2}>Nome do Item *</Text>
            <TextInput
                placeholder="Nome do Item"
                onChangeText={setNome}
                style={styles.TextSenha}
            />
            <Text style={styles.msgerro}>{vnome}</Text>
            <Text style={styles.title2}>Descrição do Item *</Text>
            <TextInput
                placeholder="Descrição do Item"
                onChangeText={setDescricao}
                style={styles.TextSenha}
            />
            <Text style={styles.msgerro}>{vdescricao}</Text>

            <View style={{flexDirection: 'row' }}>
              <Text style={styles.titleValor}>Valor Do Item *</Text>
              <Text style={styles.titleEst}>Estado Do Item *</Text>
            </View>

            <View style={{flexDirection: 'row' }}>
              <TextInput
                keyboardType="number-pad"
                placeholder="Valor do Item"
                onChangeText={setValor}
                style={styles.TextValor}
              />
              <View style={styles.TextEst}>
                <RNPickerSelect
                  onValueChange={(value) => setEstado(value)}
                  placeholder = {{
                    label: 'Estado do Item', 
                    value: null, 
                    color: '#C7C7CD',
                  }}
                  items={[
                    { label: 'Novo', value: 'novo', color: 'black'},
                    { label: 'Usado', value: 'usado', color: 'black'},
                    { label: 'Velho', value: 'velho', color: 'black'},
                  ]}
                />
              </View>
            </View>
            
            <View style={{flexDirection: 'row' }}>
              <Text style={styles.msgerroValor}>{vvalor}</Text>
              <Text style={styles.msgerroEstado}>{vestado}</Text>
            </View>

            <Text style={styles.title2}>Categoria Do Item *</Text>
            <View style={styles.pickercontainer}>
              <RNPickerSelect
                onValueChange={(value) => setCategoria(value)}
                placeholder = {{
                  label: 'Categoria', 
                  value: null, 
                  color: '#C7C7CD',
                }}
                items={[
                  { label: 'Vai vir do back', value: 'aguardando rota', color: 'black'},
                ]}
              />
            </View>
            <Text style={styles.msgerro}>{vcategoria}</Text>
            <Text style={styles.title2}>Quantidade *</Text>
            <TextInput
                keyboardType="number-pad"
                placeholder="Quantidade"
                onChangeText={setQuantidade}
                style={styles.TextSenha}
            />
            <Text style={styles.msgerro}>{vquantidade}</Text>
            <TouchableOpacity style = {styles.buttonPick}onPress={pickImage}>
              <Text style={styles.buttonText}>Escolha a imagem do item</Text>
            </TouchableOpacity>
            {image != null ? (
              <Image
                source={{uri:image.uri}}
                style={styles.Img}
              />
            ) : null}
            <Text style={styles.msgerro}>{vimage}</Text>

            <TouchableOpacity style={styles.buttonRegister} onPress={() => salvar()}>
              <Text style={styles.buttonText}>Registrar item</Text>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </View>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6E6',
    },
    Img:{
      width: 300,
      height: 300,
      alignSelf: 'center',
      borderRadius: 10,
      marginTop: 20,
      marginBottom: 20
    },
    containerview: {
      backgroundColor: "#1E1E1E",
      paddingTop: statusbarHeight,
      flexDirection: 'row',
    },
    title:{
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 18
    },
    username:{
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    buttonUser:{
        width: 44,
        height: 44,
        color: '#FF7851',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerForm:{
        backgroundColor: '#1E1E1E',
        fontSize: 10,
        flex: 1,
        paddingHorizontal: 10,
        borderRadius: 25,
      },
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
    msgerroValor:{
      color:"red",
      fontSize: 16,
      alignSelf:'flex-start',
      marginRight: 20
    },
    msgerroEstado:{
      color:"red",
      fontSize: 16,
      alignSelf:'flex-start',
      marginLeft: 20
    },
    buttonRegister:{
      backgroundColor: '#FF7851',
      marginTop: 30,
      marginBottom: 30,
      padding: 10,
      borderRadius: 50,
      width: '45%',
      alignSelf: 'center'
    },
    buttonPick:{
      padding: 5,
      backgroundColor: '#1E1E1E',
      marginTop: 10,
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center'
    },
    buttonText:{
      color: '#E6E6E6',
      fontSize: 20,
      alignSelf: 'center',
    },
    title2:{
      backgroundColor: '#E6E6E6',
      color: 'black',
      marginTop: 10,
      fontSize: 20,
      borderRadius: 20,
    },
    titleValor:{
      backgroundColor: '#E6E6E6',
      color: 'black',
      marginTop: 10,
      fontSize: 20,
      width: '45%'
    },
    titleEst:{
      backgroundColor: '#E6E6E6',
      color: 'black',
      marginTop: 10,
      fontSize: 20,
    },
    TextSenha:{
      backgroundColor: 'white',
      padding: 5,
      color: 'black',
      borderRadius: 50,
      width: '80%',
      fontSize: 16,
      // height: 60,
      alignSelf: 'center',
      textAlign: 'center'
    },
    TextValor:{
      backgroundColor: 'white',
      padding: 5,
      color: 'black',
      borderRadius: 50,
      width: '40%',
      fontSize: 16,
      alignSelf: 'flex-start',
      textAlign: 'center',
    },
    TextEst:{
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white',
      color: 'black',
      borderRadius: 50,
      height: 40,
      width: '35%',
      fontSize: 16,
      textAlign: 'center',
      marginLeft: 25,
    },
    title1:{
      backgroundColor: '#E6E6E6',
      color: 'black',
      fontSize: 30,
      fontWeight: '400'
    },
    pickercontainer:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      height: 40,
      textAlign: 'center',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      alignItems: 'center',
      fontSize: 10,
    },
    linearGradient:{
      width: '100%',
    }
});