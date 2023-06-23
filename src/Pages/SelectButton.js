
import './Coin.css'
const SelectButton = ({ children, selected, onClick }) => {

  const Styles = {
    selectbutton: {
      border: "1px solid purple",
      borderRadius: 5,
      // padding: 10,
      // paddingLeft: 20,
      // paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "purple" : "",
      color: selected ? "white" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "purple",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
    },
  };



  return (
    <span className='selectbutton' onClick={onClick} style={Styles.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;