import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, Text, Pressable, View, ScrollView, TextInput, Alert } from 'react-native';
import general from '../styles/General.js';
import fetchLink from "../helpers/fetchLink.js";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { userLoggedIn } from "../screens/Login.js";

export default function TaskManager({navigation, route}) {
  // Hold params data from route
  const [ediMode, setEditMode] = useState(route.params.isEdit);
  const [task, setTask] = useState(route.params.task);
  const [project, setProject] = useState(route.params.project);
  
  // Task Model Attributes
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [starDate, setStartDate] = useState('YYYY-MM-DD');
  const [endDate, setEndDate] = useState('YYYY-MM-DD');
  const [status, setStatus] = useState('Ongoing');
  const [rate, setRate] = useState(0);
  // Hold which date should be update with the date picker
  const [pickStartDate, setPickStartDate] = useState(false);
  const [date, setDate] = useState(new Date());
  // Dropdown variables
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);

  const goBack = () => {
    navigation.goBack()
  }

  const formatDate = (value) => {
    return new Date(value).toISOString().slice(0, 10);
  }

  const onChange = (event, selectedDate) => {
    if(pickStartDate) {
      setStartDate(formatDate(selectedDate));
    } else {
      setEndDate(formatDate(selectedDate));
    }
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = (isStartDate) => {
    setPickStartDate(isStartDate);
    showMode('date');
  };

   const getUsersDB = () => {
      fetch(fetchLink + '/api/user/', {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
          method: 'GET',
          }).then(res => res.json()).then(data => {
            console.log(data)
            let temp = []
            for(let i=0;i<data.length;i++){
              temp.push({label: data[i].first_name + " " + data[i].last_name, value: i, id: data[i]._id})
            }
            console.log(temp)
              setItems(temp)
          });
  }

  const getTasksDB = () => {
    fetch(fetchLink + '/api/task/'+project._id, {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        method: 'GET',
        }).then(res => res.json()).then(data => {
          console.log(data)
          let temp = []
          for(let i=0;i<data.length;i++){
            temp.push({label: data[i].name, value: i, id: data[i]._id})
          }
          console.log(temp)
            setItems2(temp)
        });
}

  const handleCreate = () => {
    if(name == '' || desc == '' || starDate == 'YYYY-MM-DD' || endDate == 'YYYY-MM-DD' || rate == 0){
        alert("Please check the inputs!")
    }else{
      let employeeID = ""
      let employeeName = ""
            for(let i=0;i<items.length;i++){
                if(items[i].value == value){
                    employeeID = items[i].id
                    employeeName = items[i].label
                    break
                }
            }

            //console.log(name + desc + userLoggedIn._id + employee + " " + rate + starDate + endDate + " " + project._id)
        const taskData = {
          name: name,
          description: desc,
          created_by: userLoggedIn.first_name + " " + userLoggedIn.last_name,
          status: "Ongoing",
          assigned_to: {id: employeeID, name: employeeName},
          pay_rate: rate,
          start_date: starDate,
          end_date: endDate,
          project_id: project._id
        }
        fetch(fetchLink + '/api/task/', {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        method: 'POST',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        },
        }).then(res => res.json()).then(data => console.log(data));
        alert("Task was added Successfully!")

        updateTaskNumber(project.task_number+1)
        navigation.pop()
        navigation.pop()
        navigation.replace("Home")

    }
  }

  function updateTaskNumber(tNumber){             //Method to update the task number of project after adding task or deleting task
        let projID = project._id
        let stDate = formatDate(project.start_date)
        let enDate = formatDate(project.end_date)
        const projData = {
            task_number: tNumber,
            start_date: stDate,
            end_date: enDate
            
        }
        fetch(fetchLink + '/api/project/'+projID, {           
        method: 'PATCH',
        body: JSON.stringify(projData),
        headers: {
            'Content-Type': 'application/json'
        },
        }).then(res => res.json()).then(data => console.log(data));
  }

  const handleUpdate = () => {
    if(name == '' || desc == '' || starDate == 'YYYY-MM-DD' || endDate == 'YYYY-MM-DD' || rate == 0){
        alert("Please check the inputs!")
    }else{
      let employeeID = ""
      let employeeName = ""
            for(let i=0;i<items.length;i++){
                if(items[i].value == value){
                    employeeID = items[i].id
                    employeeName = items[i].label
                    break
                }
            }
      let taskID = task._id
        const taskData = {
          name: name,
          description: desc,
          //created_by: userLoggedIn._id,
          //status: "Ongoing",
          assigned_to: {id: employeeID, name: employeeName},
          pay_rate: rate,
          start_date: starDate,
          end_date: endDate,
        }
        fetch(fetchLink + '/api/task/'+taskID, {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        method: 'PATCH',
        body: JSON.stringify(taskData),
        headers: {
            'Content-Type': 'application/json'
        },
        }).then(res => res.json()).then(data => console.log(data));
        alert("Task was updated Successfully!")
        navigation.pop()
        navigation.pop()
    }
  }

  const handleDelete = () => {
    Alert.alert(
      "Task Delete",
      "Are you sure you want to delete this Task?",
      [
        {
          text: "Cancel",
          //onPress: () => console.log("Cancel Pressed"),
        },
        { text: "Yes", onPress: () => {
          let taskID = task._id
          fetch(fetchLink + '/api/task/'+taskID, {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
          method: 'DELETE',
          }).then(res => res.json()).then(data => console.log(data));
          alert("Task was deleted Successfully!")
          updateTaskNumber(project.task_number-1)
          navigation.pop()
          navigation.pop()
          navigation.replace("Home")
        } 
      }
      ]
    );
    
}

    useEffect(() => {
      getUsersDB()
      getTasksDB()
    }, []);

  useEffect(() => {
    if (task) {
      setName(task.name);
      setDesc(task.description);
      setStatus(task.status);
      setRate(task.pay_rate);
      setStartDate(formatDate(task.start_date));
      setEndDate(formatDate(task.end_date));
    }
  }, []);

  return (
    <SafeAreaView style={general.container}>
      <Pressable onPress={goBack} style={general.returnBtn}>
        <Ionicons name="arrow-back" size={24}  style={{marginRight: 15}} color="#84B026" />
        {ediMode ? 
            <Text style={general.headline}>Task Editing</Text>
        :
        <Text style={general.headline}>Task</Text>
        }
      </Pressable>

      <ScrollView style={[general.fullW, general.paddingH]}>
        <TextInput style={general.inputs} value={name} placeholder='Name' onChangeText={text => setName(text)}/>

        <TextInput style={general.inputs} value={desc} placeholder='Description' onChangeText={text => setDesc(text)}/>

        <Text style={general.whiteTxt}>Assign To:</Text>
        <DropDownPicker
        open={open}
        value={value}
        items={items}
        style={{ marginBottom: 15, marginTop: 5, zIndex: 10 }}
        placeholder="None"
        listMode="SCROLLVIEW"
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems} />

      <Text style={general.whiteTxt}>Task Prerequisite:</Text>
        <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        style={{ marginBottom: 15, marginTop: 5, zIndex: 1 }}
        placeholder="None"
        listMode="SCROLLVIEW"
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2} />

        <Text style={[general.whiteTxt, {marginBottom: 5}]}>Hourly Rate:</Text>
        <TextInput style={general.inputs} value={String(rate)} placeholder='$0.00' onChangeText={text => setRate(text)}/>

        <Text style={general.whiteTxt}>Start Date: </Text>
        <Pressable onPress={() => showDatepicker(true)} style={general.datePicker}>
            <Text style={general.datePickerTxt}>{starDate}</Text>
        </Pressable>

        <Text style={general.whiteTxt}>End Date: </Text>
        <Pressable onPress={() => showDatepicker(false)} style={general.datePicker}>
            <Text style={general.datePickerTxt}>{endDate}</Text>
        </Pressable>


      {ediMode ? 
      <>
        <Pressable style={[general.btn, general.btnGreen]} onPress={() => handleUpdate()}>
            <Text style={[general.btnTxt]}>Update</Text>
        </Pressable>

        <Pressable style={[general.btn, general.btnRed]}  onPress={() => handleDelete()} >
            <Text style={[general.btnTxt]}>Delete</Text>
        </Pressable>
      </>
      :
        <Pressable style={[general.btn, general.btnGreen]} onPress={() => handleCreate()}>
          <Text style={general.btnTxt}>Create</Text>
        </Pressable>
      }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
    },
    headline: {
      fontWeight: 'bold',
      fontSize: 25,
      color: '#fff',
      paddingVertical: 15,
    },
    logout: {
      width: '100%',
      paddingHorizontal: 15,
      marginBottom: 15,
      borderRadius: 8,
      paddingVertical: 15,
      paddingHorizontal: 15,
      backgroundColor: '#BF1700',
      maxWidth: 200,
      marginTop: 15
    },
    btnTxt: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    whiteTxt: {
      color: '#fff',
      fontSize: 15,
      marginBottom: 5
    }
  });