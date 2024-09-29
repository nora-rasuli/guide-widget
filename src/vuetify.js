import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // For icons

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi", // Use Material Design Icons (mdi)
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        primary: "#3498db",
        secondary: "#2ecc71",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});

export default vuetify;
