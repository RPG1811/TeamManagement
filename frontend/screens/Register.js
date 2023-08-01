import { useEffect, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, Pressable, ScrollView } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import general from '../styles/General.js';
import fetchLink from '../helpers/fetchLink.js';

export default function Login({navigation}) {
    // Dropdown variables
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Manager', value: 0 },
        { label: 'Developer', value: 1 },
        { label: 'QA', value: 2 }
    ]);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const goToScreen = (value) => {
        navigation.navigate({ name: value });
    }

    const handleSignUp = () => {
        if(email == '' || password == '' || firstName == '' || lastName == '' || confirmPassword == '' || value == null){
            alert("Please fill all the inputs!")
        }else if(password != confirmPassword){
            alert("Passwords are not the same!")
        }else if(password.length <6){
            alert("Password must be at least 6 characters!")
        }else{
            let pos = ""
            for(let i=0;i<items.length;i++){
                if(items[i].value == value){
                    pos = items[i].label
                    break
                }
            }
            const userData = {
                first_name: firstName,
                last_name: lastName,
                position: pos,
                email: email,
                password:password,
            }
            console.log(JSON.stringify(userData))

             //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
            fetch(fetchLink + '/api/user/', { 
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json'
            },
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                alert("Registration was successful! You can now sign in.");
                navigation.replace("Login");
            })
            .catch(error => {
                console.error(error);
                alert("An error occurred during registration. Please try again later.");
            });
        }
    }

    return (
        <SafeAreaView style={general.container}>
            <ScrollView style={[general.fullW, general.paddingH]}>
                <Text  style={general.headline}>Sign Up</Text>
                <TextInput style={general.inputs} placeholder='First Name' onChangeText={text => setFirstName(text)}/>
                <TextInput style={general.inputs} placeholder='Last Name' onChangeText={text => setLastName(text)}/>

                <Text style={general.whiteTxt}>Job Position:</Text>
                <DropDownPicker
                open={open}
                value={value}
                items={items}
                style={{ marginBottom: 15, marginTop: 5 }}
                placeholder="None"
                listMode="SCROLLVIEW"
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems} />

                <TextInput style={general.inputs} placeholder='Email' onChangeText={text => setEmail(text)}/>
                <TextInput style={general.inputs} placeholder='Password' onChangeText={text => setPassword(text)} secureTextEntry/>
                <TextInput style={general.inputs} placeholder='Confirm Password' onChangeText={text => setConfirmPassword(text)} secureTextEntry/>

                <Pressable style={[general.btn, general.btnGreen]} onPress={() => handleSignUp()}>
                    <Text style={general.btnTxt}>Register</Text>
                </Pressable>
                <Pressable style={[general.btn, general.btnBorder]}  onPress={() => goToScreen('Login')} >
                    <Text style={[general.btnTxt, general.greenTxt]}>Sign In</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}