import colors from './colors';
const palette = {
  container: {
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
  },
  header: {
    image: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerLeftContainer: {
      padding: 12,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerLeftImage: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
    headerRightContainer: {

      padding: 10,
      // marginBottom:25,
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRightImage: {
      width: 25,
      height: 25,
      resizeMode: 'contain',
    },
  },
  text: {
    color: 'white',
  },
};

export default palette;
