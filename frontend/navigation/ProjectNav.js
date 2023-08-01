import { createStackNavigator } from '@react-navigation/stack';
import ProjectList from '../screens/Projects.js';
import ProjectManager from '../admin/ProjectManager.js'
import Task from './TaskNav.js';

const Stack = createStackNavigator();

export default function ProjectNav() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#000' }} }>
            <Stack.Screen name="Project" component={ProjectList} />
            <Stack.Screen name="ProjectManager" component={ProjectManager} />
            <Stack.Screen name="Task" component={Task} />
        </Stack.Navigator>
    );
}