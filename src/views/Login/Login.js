import React,{useState}  from "react";
import { Text, View, StyleSheet,SafeAreaView,TextInput,Button,Alert } from "react-native";
import LoginStyle from './LoginStyle.js';
import {authUser} from '../../app/remotes/Auth';
import {useMutation} from 'react-query';
import { useDispatch } from "react-redux";
import {set_contact_stack} from '../../app/redux/actions/stackview';

const styles = StyleSheet.create(LoginStyle);

const Login = ({ navigation }) =>  {
  const dispatch = useDispatch();
  const {mutate,isLoading} = useMutation(
    authUser,
    {
        onSuccess:(data) => completeLogin(data),
        onError:(error) => console.log(error)
    }
  );
  const [username, setUsername] = useState('cfvelez9@gmail.com');
  const [password, setPassword] = useState('123456');

  const completeLogin = (data) => {
    if(data == false){
      Alert.alert(
        "Login incorrecto",
        "Usuario o clave incorrectos",
      );
    }
    else
      dispatch(set_contact_stack({}));
  }

  const handleSubmit = async() => {
    await mutate({username,password})
  }

  return( <SafeAreaView>
            <View style={styles.form}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput onChangeText={(text)=> setUsername(text)} style={styles.textInput} value={username}></TextInput>
              <Text style={styles.label}>Clave</Text>
              <TextInput onChangeText={(text) => setPassword(text)} style={styles.textInput} value={password} secureTextEntry={true}></TextInput>
              <Button onPress={handleSubmit} title='Login'></Button>
              {isLoading && <Text>Cargando...</Text>}
            </View>
        </SafeAreaView>);
};

export default Login;
