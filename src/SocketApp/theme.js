import { Global as EmoGlobal, css } from "@emotion/react";

import facepaint from "facepaint";
const bps = ["400", "600", "800", "1060"];

export const mq = bps.map((bp) => `@media (max-width: ${bp}px)`);
export const mqMin = bps.map((bp) => `@media (min-width: ${bp}px)`);

export const mqO = facepaint([
  `@media(max-width: ${bps[3]}px)`,
  `@media(max-width: ${bps[2]}px)`,
  `@media(max-width: ${bps[1]}px)`,
  `@media(max-width: ${bps[0]}px)`,
]);

export const theme = {
  colors: {
    color1: "#b7410e",
    color2: "#f4f7be",
    color2Lighter: "rgba(244, 247, 191, 0.61)",
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
