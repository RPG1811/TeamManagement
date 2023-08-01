import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    paddingH: {
        paddingHorizontal: 15
    },
    fullW: {
        width: '100%'
    },
    headline: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#84B026',
        paddingVertical: 15
    },
    inputs: {
        backgroundColor: '#fff',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 15
    },
    btn: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 15,
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 15
    },
    btnTxt: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    btnRed: {
        backgroundColor: '#BF1700',
    },
    btnGreen: {
        backgroundColor: '#84B026'
    },
    btnBorder: {
        borderWidth: 2,
        borderColor: '#84B026'
    },
    boldTxt: {
        fontWeight: 'bold'
    },
    blackTxt: {
        color: '#000'
    },
    greenTxt: {
        color: '#84B026'
    },
    whiteTxt: {
        color: '#fff'
    },
    returnBtn: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    datePicker: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 15,
        marginTop: 5
    },
    datePickerTxt: {
        color: '#959595',
        paddingVertical: 5,
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexEvenSpace: {
        justifyContent: 'space-between'
    },
    bottomNav: { 
        borderTopColor:  '#84B026',
        height: 50,
        paddingTop: 5,
        backgroundColor: '#000' 
    },
    topNav: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    menu: {
        width: 50,
        height: '100%',
        right: 0,
        top: 0,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 15
    }
});