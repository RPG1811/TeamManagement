import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    card: {
        width: '100%',
        backgroundColor: '#3B3C40',
        borderRadius: 5,
        marginBottom: 15,
        position: 'relative'
    },
    cardPadding: {
        paddingHorizontal: 10,
        paddingTop: 15,
        paddingBottom: 24
    },
    cardName: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    },
    cardTask: {
        flexDirection: 'row',
        paddingTop: 5
    },
    cardBar: {
        width: '100%',
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#fff',
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 10,
        marginBottom: 5
    },
    cardProgress: {
        backgroundColor: '#84B026',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0
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
    },
});