import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    mainContentContainer: {
      flex: 1,
      backgroundColor: "#f5f6f8",
      minHeight: 200,
     // paddingHorizontal:30,
    },
    innerContainer: {
      marginTop:20,
      alignItems:"center",
      justifyContent:"center"
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems:'center',
    },
    col: {
      flexDirection:"column"
    },
    modal: {
      elevation: 5,
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 15,
      backgroundColor: "#65479c",
      marginHorizontal: "1%",
      marginBottom: 6,
      textAlign: "center",
      width:"100%",
    },
    buttonText:{
      color:"#fff", 
      textAlign:"center",
      fontSize:18
    },
    powerButton:{
      backgroundColor:'ghostwhite',
      borderRadius:75,
      borderWidth:4,
      borderColor:'azure'
    },
    card:{
      padding:20,
      backgroundColor: "#fff",
     // borderRadius: 5,
      elevation:5,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: {width:0, height:1},
      shadowRadius:1,
      marginBottom:20,
      //flex:1,
     // alignItems:"center",
      width:"100%",
    },
    cardHeader:{
      fontSize:16,
      fontWeight:"500",
      borderBottomColor:"lightgray",
      borderBottomWidth:2,
      marginBottom:10
    },
    imgIcon:{
      width:80,
      height:80,
      resizeMode:"contain",
      marginRight:20
    },
    h2:{
      fontSize:30,
      color:"#3d5170"
    },
    h4:{
      fontSize:18,
    },
    link:{
      color:'dodgerblue',
      fontSize:18,
     // paddingHorizontal:10
    },
    textMuted:{
      color:"#9ea8b9",
      letterSpacing:1,
      textTransform:"uppercase"
    },
    spaceAround:{
      justifyContent:"space-around"
    },
    textRight:{
      textAlign:"right",
      alignSelf:"flex-end",
    },
    textLeft:{
      textAlign:"left",
      alignSelf:"flex-start",
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pushRight:{
      flex:1, alignItems:'center', justifyContent:'flex-end'
    },
    pushLeft:{
      flex:1, alignItems:'center', justifyContent:'flex-start'
    },
    pushBottom:{position:"absolute", bottom:0},
    input:{
      marginVertical: 12,
      borderWidth: 1,
      padding: 10,
  //    flex:1,
      borderColor:"#e1e5eb",
      borderRadius:2,
      color:"#495057",
      width:'80%'
    },
    hr:{
      borderBottomColor: "#e1e5eb",
      borderBottomWidth: 1,
      height:1,
      backgroundColor:"black",
      width:'100%',
    },
    marginBottom:{
      marginBottom:15
    },
    paginationBoxStyle: {
      alignItems: "center",
      alignSelf: "center",
      justifyContent: "center",
      paddingVertical: 10
    },
    dotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 0,
      padding: 0,
      margin: 0,
      backgroundColor: "rgba(128, 128, 128, 0.92)"
    },
    userAvatar:{
      width:50,
      height:50,
      borderRadius:25,
      marginRight:20,
    },
    grid:{
      marginRight:8,
      marginBottom:8
    }

  })

  export default styles