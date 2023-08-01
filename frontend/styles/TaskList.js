import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
    selectGroup: {
        justifyContent: 'center',
        marginBottom: 15
    },
    selector: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginHorizontal: 5
    },
    greenBG: {
        backgroundColor: '#84B026'
    },
    borderBG: {
        backgroundColor: 'transparent'
    },
    headline: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15
    },
    card: {
        width: '100%',
        backgroundColor: '#3B3C40',
        borderRadius: 5,
        marginBottom: 15,
        position: 'relative',
    },
    cardPadding: {
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 25
    },
    cardName: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    cardResponsable: {
        marginBottom: 15
    },
    edit: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exit: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    }
});