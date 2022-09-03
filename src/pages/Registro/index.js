import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, ScrollView} from 'react-native';
import 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {Picker} from '@react-native-picker/picker';

import {useNavigation} from '@react-navigation/native'

const statusbarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 8 : 64;

export default function Registro(params) {
  const [image, setImage] = useState(null);
  // console.log(params.route.params.id);
  const userid = params.route.params.id
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
    const navigation = useNavigation();
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
        setVcategoria("Selecione a categoria do item")
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
      const response = await fetch('https://upgrade-back-staging.herokuapp.com/product/register',{
        method: 'POST',
        body: JSON.stringify({
          "title" : nome,
          "description" : descricao,
          "price" : valor,
          "condition" : estado,
          "class" : categoria,
          "amount" : quantidade,
          "userId" : userid,
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
        <ScrollView style={styles.container}>
          <View style={styles.containerview}>
            <View style={styles.content}>
              {/* <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
                <Feather name="menu" size={27} color="#FF7851"/>
              </TouchableOpacity> */}
              <View style={styles.containerForm}>
                <Text style={styles.title}> Registrar item para a Venda</Text>
              </View>      
            </View>
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
        <Text style={styles.title2}>Valor Do Item *</Text>
        <TextInput
            keyboardType="number-pad"
            placeholder="Valor do Item"
            onChangeText={setValor}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vvalor}</Text>
        <Text style={styles.title2}>Estado Do Item *</Text>
        <TextInput
            placeholder="Estado do Item"
            onChangeText={setEstado}
            style={styles.TextSenha}
        />
        <Text style={styles.msgerro}>{vestado}</Text>
        <Text style={styles.title2}>Categoria Do Item *</Text>
        <View style={styles.pickercontainer}>
        <Picker
          style={styles.TextSenha}
          selectedValue={categoria}
          onValueChange={(itemValue, itemIndex) =>setCategoria(itemValue)}
          itemStyle={styles.TextSenha}
        >
          
          <Picker.Item label="Memória Ram" value="memoria ram" />
          <Picker.Item label="HD" value="HD" />
          <Picker.Item label="SSD" value="SSD" />
          <Picker.Item label="placa de video" value="placa de video" />
          <Picker.Item label="placa Mãe" value="placa mae" />
          <Picker.Item label="Monitor" value="monitor" />
          <Picker.Item label="Gabinete" value="gabinete" />
          <Picker.Item label="Periférico" value="periférico" />
          <Picker.Item label="Processador" value="processador" />
          <Picker.Item label="Cooler" value="Cooler" />
        </Picker>
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
        <TouchableOpacity style = {styles.buttonPick}onPress={pickImage} >
        <Text style={styles.buttonText}>Escolha a imagem do item</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonRegister} onPress={() => salvar()}>
        <Text style={styles.buttonText}>Registrar item</Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    );
}
  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E6E6E6',
    },
    containerview: {
      backgroundColor: "#1E1E1E",
      paddingTop: statusbarHeight,
      flexDirection: 'row',
      paddingStart: 16,
      paddingEnd: 16,
      paddingBottom: 18,
    },
    content:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title:{
        color: '#FF7851',
        fontSize: 20 ,
        alignSelf: 'center'
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
    buttonRegister:{
      backgroundColor: '#1E1E1E',
      marginTop: 30,
      padding: 10,
      borderRadius: 50,
      width: '45%',
      alignSelf: 'center'
    },
    buttonPick:{
      padding: 5,
      backgroundColor: '#FF7851',
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
      color: '#FF7851',
      marginTop: 10,
      fontSize: 20,
      borderRadius: 20,
    },
    TextSenha:{
      backgroundColor: 'white',
      padding: 5,
      color: 'black',
      borderRadius: 50,
      width: '80%',
      fontSize: 20,
      // height: 60,
      alignSelf: 'center',
      textAlign: 'center'
    },
    title1:{
      backgroundColor: '#E6E6E6',
      color: '#FF7851',
      fontSize: 30,
      fontWeight: '400'
    },
    pickercontainer:{
      backgroundColor: 'white',
      borderRadius: 50,
      width: '80%',
      alignSelf: 'center',
      fontSize: 10,
    }
});