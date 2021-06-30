import { Global as EmoGlobal, css } from "@emotion/react";

export const theme = {
  colors: {
    color1: "#b7410e",
    color2: "#f4f7be",
    color3: "#e5f77d",
    color4: "#deba6f",
    color5: "#1e000e",
  },
};

export const Global = () => (
  <EmoGlobal
    styles={(p) => css`
      * {
        box-sizing: border-box;
      }
      html {
        height: 100%;
      }
      body {
        font-family: "Lato", sans-serif;
        margin: 0;
        padding: 0;
        a {
          text-decoration: none;
          color: ${(p) => p.theme.colors.color_1};
        }
      }
    `}
  />
);
