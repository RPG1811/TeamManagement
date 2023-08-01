import { createStackNavigator } from '@react-navigation/stack';
import TaskList from '../screens/Tasks.js';
import TaskManager from '../admin/TaskManager.js'
import TaskInfo from '../screens/TaskInfo.js'

const Stack = createStackNavigator();

export default function ProjectNav() {
    return (
        <Stack.Navigator screenOptions={ { headerShown: false, headerStyle: { backgroundColor: '#000' }} }>
            <Stack.Screen name="TaskList" component={TaskList} />
            <Stack.Screen name="TaskManager" component={TaskManager} />
            <Stack.Screen name="TaskInfo" component={TaskInfo} />
        </Stack.Navigator>
    );
}