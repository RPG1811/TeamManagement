import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Pressable, FlatList, View } from 'react-native';
import general from '../styles/General.js';
import taskS from '../styles/TaskList.js';
import fetchLink from "../helpers/fetchLink.js";
import { userLoggedIn } from "./Login.js";

/*const tempTask = [
  {
    name: 'Task A',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name A' },
    status: 'To-Do',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task B',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name B' },
    status: 'Ongoing',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task C',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name C' },
    status: 'Completed',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task A',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name A' },
    status: 'To-Do',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task B',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name B' },
    status: 'Ongoing',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task C',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name C' },
    status: 'Completed',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task A',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name A' },
    status: 'To-Do',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task B',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name B' },
    status: 'Ongoing',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task C',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name C' },
    status: 'Completed',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task A',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name A' },
    status: 'To-Do',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task B',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name B' },
    status: 'Ongoing',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task C',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name C' },
    status: 'Completed',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task A',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name A' },
    status: 'To-Do',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task B',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name B' },
    status: 'Ongoing',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  },
  {
    name: 'Task C',
    description: 'task desc here...',
    created_by: 'Creator Name',
    pay_rate: 15,
    hour_post: [ { name: 'Name Here', time: 0, pay: 0 } ],
    responsable: { name: 'Employee Name C' },
    status: 'Completed',
    start_date: "2022-01-20",
    end_date: "2022-02-01",
    completed_date: null
  }
];*/
const options = ['To-Do', 'Ongoing', 'Completed']

export default function Tasks({navigation, route}) {
  const [project, setProject] = useState(route.params.project);
  const [taskList, setTaskList] = useState();
  //const [statusList, setStatusList] = useState(statusList.filter((a) => a.status == 'To-Do'));
  const [statusList, setStatusList] = useState([]);
  const [status, setStatus] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const goBack = () => {
    navigation.goBack()
  }

  const createTask = () => {
    navigation.navigate('TaskManager', { task: null, isEdit: false, project: project})
  }

  const editTask = (index) => {
    navigation.navigate('TaskManager', { task: statusList[index], isEdit: true, project: project})
  }

  const openTask = (index) => {
    navigation.navigate('TaskInfo', { task: statusList[index] , project: project})
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  }

  const selectStatus = (index) => {
    setStatus(index)

    if (index == 0) {
      // TO-DO
    } else if (index == 1) {
      // TO-DO
    } else {
      // TO-DO
    }
  }

  const getTasksDB = () => {
    fetch(fetchLink + '/api/task/'+project._id, {           //THIS IS FOR ANDROID EMULATOR! MIGHT BE DIFFERENT FOR OTHER DEVICES.
        method: 'GET',
        }).then(res => res.json()).then(data => {
            for(let i =0; i<data.length;i++){
              data[i].assName = data[i].assigned_to.name
            }
            console.log(data)
            setTaskList(data)
            setStatusList(data)
        });
  }

  useEffect(() => {
    getTasksDB()
  }, []);

  const formatDate = (value) => {
    return new Date(value).toISOString().slice(0, 10);
  }

  return (
    <SafeAreaView style={general.container}>
      <View style={general.topNav}>
        <Pressable onPress={goBack} style={[general.returnBtn]}>
          <Ionicons name="arrow-back" size={24}  style={{marginRight: 15}} color="#84B026" />
          <Text style={general.headline}>Tasks</Text>
        </Pressable>

        <Pressable onPress={toggleMenu} style={general.menu}>
          {showMenu ?
            <AntDesign name="close" size={24} color="#84B026" />
          :
            <Ionicons name="md-options" size={24} color="#84B026"/>
          }
        </Pressable>
      </View>

      <View style={[general.paddingH, general.fullW]}>
        {showMenu ?
        userLoggedIn.admin ? 
            <Pressable onPress={createTask} style={[general.btn, general.btnBorder]}>
            <Text style={[general.btnTxt, general.greenTxt]}>Add Task</Text>
            <Ionicons name="add-circle-outline" size={24} style={{marginLeft: 10}} color="#84B026" />
            </Pressable>
          :<></>
        : <></>}

        {showMenu ?
          <View style={[general.fullW, general.flexRow, taskS.selectGroup]}>
            <Pressable onPress={() => selectStatus(0)} 
            style={[taskS.selector, status == 0 ? taskS.borderBG : taskS.greenBG]}>
              <Text style={status == 0 ? general.greenTxt : general.whiteTxt}>To-Do</Text>
            </Pressable>

            <Pressable onPress={() => selectStatus(1)} 
            style={[taskS.selector, status == 1 ? taskS.borderBG : taskS.greenBG]}>
              <Text style={status == 1 ? general.greenTxt : general.whiteTxt}>Ongoing</Text>
            </Pressable>

            <Pressable onPress={() => selectStatus(2)} 
            style={[taskS.selector, status == 2 ? taskS.borderBG : taskS.greenBG]}>
              <Text style={status == 2 ? general.greenTxt : general.whiteTxt}>Complete</Text>
            </Pressable>
          </View>
        :
          <Text style={[general.whiteTxt, taskS.headline]}>{options[status]}:</Text>
        }

      </View>

      <FlatList style={[general.fullW, general.paddingH ]} data={statusList} 
      renderItem={({ item, index }) => 
        <View style={taskS.card}>
          <View style={taskS.cardPadding}>
            <Text style={[general.greenTxt, taskS.cardName]}>{item.name}</Text>
            <Text style={[general.whiteTxt, taskS.cardResponsable]}>{item.assName}</Text>
            <View style={[general.fullW, general.flexRow]}>
              <Text style={[general.whiteTxt, general.boldTxt]}>Status: </Text>
              <Text style={general.greenTxt}>{item.status}</Text>
            </View>
            <View style={[general.fullW, general.flexRow]}>
              <Text style={[general.whiteTxt, general.boldTxt]}>Due Date: </Text>
              <Text style={general.greenTxt}>{formatDate(item.end_date)}</Text>
            </View>
          </View>

          <Pressable onPress={() => openTask(index)} style={taskS.exit}></Pressable>

          {userLoggedIn.admin ? 
          <Pressable onPress={() => editTask(index) } style={taskS.edit}>
            <FontAwesome name="edit" size={24} color="#84B026" />
          </Pressable>
          :<></>
          }
        </View>
      }/>

    </SafeAreaView>
  );
}