import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      marginBottom: 80
    },
    content: {
      alignItems: 'center',
      width: "80%",
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    title: {
      fontSize: FONT_SIZE.lg,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
};