
const itemPosition = {
  'marginTop':12,
  'marginLeft':12,
  'marginRight':12
}
const StoryPointFormStyle = {
  form : {
    paddingHorizontal: 16
  },
  textInput : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  itemPosition: itemPosition,
  label:{
    ...itemPosition,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent:'space-between'
  }
};

export default StoryPointFormStyle;
