import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, Text, View } from 'react-native';
import general from '../styles/General.js';
import projectS from '../styles/ProjectList.js';
import { userLoggedIn } from './Login.js';
import fetchLink from '../helpers/fetchLink.js';

export default function Projects({ navigation }) {
  let isAdmin = userLoggedIn.admin;

  const getProjectsDB = () => {
    const userID = isAdmin ? "" : userLoggedIn._id;
    fetch(fetchLink + '/api/project/' + userID, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].task_number - data[i].task_complete == 0) {
            data[i].status = "Completed";
          }
        }
        setProjectList(data);
      });
  };

  useEffect(() => {
    getProjectsDB();
  }, []);

  const [projectList, setProjectList] = useState([]);

  const openProject = (index) => {
    navigation.navigate('Task', { screen: 'TaskList', params: { project: projectList[index] } });
  };

  const editProject = (index) => {
    navigation.navigate('ProjectManager', { project: projectList[index], isEdit: true });
  };

  const createProject = () => {
    navigation.navigate('ProjectManager', { project: null, isEdit: false, fetchUpdatedProjects });
  };

  const formatDate = (value) => {
    return new Date(value).toISOString().slice(0, 10);
  };

  const fetchUpdatedProjects = () => {
    const userID = isAdmin ? "" : userLoggedIn._id;
    fetch(fetchLink + '/api/project/' + userID, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].task_number - data[i].task_complete == 0) {
            data[i].status = "Completed";
          }
        }
        setProjectList(data);
      });
  };

  return (
    <SafeAreaView style={general.container}>
      <Text style={[general.headline, general.paddingH]}>Projects</Text>
      <FlatList
        style={[general.fullW, general.paddingH]}
        data={projectList}
        ListHeaderComponent={
          <Pressable onPress={createProject} style={[general.btn, general.btnBorder]}>
            <Text style={[general.btnTxt, general.greenTxt]}>Add Project</Text>
            <Ionicons name="add-circle-outline" size={24} style={{ marginLeft: 10 }} color="#84B026" />
          </Pressable>
        }
        renderItem={({ item, index }) =>
          <View style={projectS.card}>
            <View style={projectS.cardPadding}>
              <Text style={[projectS.cardName, general.greenTxt]}>{item.name}</Text>

              <View style={projectS.cardTask}>
                <Text style={general.whiteTxt}>Status: </Text>
                <Text style={[general.boldTxt, general.greenTxt]}>{item.status} </Text>
              </View>

              <View style={projectS.cardBar}>
                <View style={[projectS.cardProgress, { width: `${(item.task_complete / item.task_number) * 100}%` }]}></View>
              </View>

              <View style={[general.flexRow, general.flexEvenSpace]}>
                <View style={projectS.cardTask}>
                  <Text style={[general.boldTxt, general.greenTxt]}>{item.task_number} </Text>
                  {item.task_number < 2
                    ? <Text style={general.whiteTxt}>Task</Text>
                    : <Text style={general.whiteTxt}>Tasks</Text>
                  }
                </View>

                <View style={projectS.cardTask}>
                  <Text style={[general.boldTxt, general.greenTxt]}>{item.task_number - item.task_complete} </Text>
                  <Text style={general.whiteTxt}>Left</Text>
                </View>
              </View>

              <View style={projectS.cardTask}>
                <Text style={general.whiteTxt}>Due Date: </Text>
                <Text style={[general.boldTxt, general.greenTxt]}>{formatDate(item.end_date)} </Text>
              </View>

              {isAdmin && (
                <View style={projectS.cardTask}>
                  <Text style={general.whiteTxt}>Cost: </Text>
                  <Text style={[general.boldTxt, general.greenTxt]}>${item.total_cost}</Text>
                </View>
              )}
            </View>

            <Pressable onPress={() => openProject(index)} style={projectS.exit}></Pressable>

            {isAdmin && (
              <Pressable onPress={() => editProject(index)} style={projectS.edit}>
                <FontAwesome name="edit" size={24} color="#84B026" />
              </Pressable>
            )}
          </View>
        } />
    </SafeAreaView>
  );
}
