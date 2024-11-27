import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 80
    },
    content: {
      alignItems: 'center',
    },
    logo: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    btn: {
      width: "80%",
      marginVertical: 20
    },
    title: {
      fontSize: FONT_SIZE.lg,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    message: {
      fontSize: FONT_SIZE.md,
      color: COLORS.dark_gray,
      marginBottom: 5,
    },
    footer: {
      position: "absolute",
      bottom: 0,
      flexDirection: "row",
      marginBottom: 20
  },
    footerText: {
      textAlign: "center",
      color: COLORS.dark_gray,
      fontSize: FONT_SIZE.mlg
  },
    logoFooter: {
      width: 30,
      height: 30,
  }
};