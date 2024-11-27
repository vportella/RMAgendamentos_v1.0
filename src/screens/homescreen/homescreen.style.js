import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    logo: {
      width: 160,
      height: 160,
      marginBottom: 40,
      marginVertical: 100,
    },
    logoFooter: {
      width: 30,
      height: 30,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    },
    footer: {
      width: "100%",
      alignSelf: 'center',
      marginVertical: 100
    },
    footerText: {
      textAlign: "center",
      color: COLORS.dark_gray,
      fontSize: FONT_SIZE.md
  },
  footerContent: {
    alignItems: 'center'
  },
}