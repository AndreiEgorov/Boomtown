const styles = theme => ({
    gridContainer: {
      backgroundColor: '#212121',
      padding: '80px',
      justifyContent: 'flex-start',

      display: "flex",
      flexDirection: "column",

      // justifyContent:"center",
    },
    headerBoxWrapper:{
        width:"100%",
        borderRadius: '40px',
    },
    headerBox:{
        backgroundColor: 'white',
        display: "flex",
        padding: "48px",
        flexWrap: "wrap",
        marginBottom: "48px",
        justifyContent: "space-between",
        
    },
    smallInnerBox:{
        boxShadow: 'none',
    },
    boxOfCards:{
      display: "flex",
      flexWrap: "wrap",
    },
    cardCell: {
      padding: '12px',
      width: '400px',
    }
  })
  
  export default styles
  