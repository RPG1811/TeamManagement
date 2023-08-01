import { SafeAreaView } from 'react-native-safe-area-context';
import { Pressable, Text, TextInput } from 'react-native';
import { useState } from "react";
import general from '../styles/General.js';
import fetchLink from '../helpers/fetchLink.js';

let userLoggedIn;

function Login({ navigation }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const goToScreen = (value) => {
    navigation.navigate({ name: value });
  } 

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      alert("Please fill in all the inputs!")
    } else {
      const userData = {
        email: email,
        password: password,
      }

      try {
        //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        const response = await fetch(fetchLink + '/api/user/?email=' + userData.email + "&password=" + userData.password, {
          method: 'GET',
        });

        const data = await response.json();

        if (data.message === "User not found.") {
          alert("Please check your email and password.");
        } else {
          console.log(data);
          userLoggedIn = data;
          alert("Login successful!");
          goToScreen('Home');
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
  }

  return (
    <SafeAreaView style={[general.container, general.paddingH]}>
      <Text style={[general.headline]}>Sign In</Text>
      <TextInput style={general.inputs} placeholder='Email' onChangeText={text => setEmail(text)} />
      <TextInput style={general.inputs} placeholder='Password' onChangeText={text => setPassword(text)} secureTextEntry />

      <Pressable style={[general.btn, general.btnGreen]} onPress={() => handleSignIn()} >
        <Text style={general.btnTxt}>Login</Text>
      </Pressable>

      <Pressable style={[general.btn, general.btnBorder]} onPress={() => goToScreen('Register')} >
        <Text style={[general.btnTxt, general.greenTxt]}>Sign Up</Text>
      </Pressable>
    </SafeAreaView>
  );
}
export { userLoggedIn }
export default Login
