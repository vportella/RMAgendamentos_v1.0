import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    logo: {
      width: 160,
      height: 160,
      marginBottom: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
      },
      title: {
        fontSize: FONT_SIZE.slg,
      },
      date: {
        fontSize: FONT_SIZE.slg,
        marginBottom: 25
      },
}