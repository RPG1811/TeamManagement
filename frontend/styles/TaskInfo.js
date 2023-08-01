import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 15
    },
    formTitle: {
        color: '#84B026',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
    },
    label: {
        marginTop: 10,
    },
    centerLine: {
        backgroundColor: '#84B026',
        width: (windowWidth - 240),
        height: 2,
    }
});