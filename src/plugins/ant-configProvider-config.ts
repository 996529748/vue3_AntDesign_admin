// const theme = {
//   buttonPrimaryBorderColor: "#5760C9",
//   buttonPrimaryBackgroundColor: "#5760C9",
//   popupBackgroundColor: "transparent",
// } as const;

// export default theme;

import { ConfigProvider } from "ant-design-vue";
ConfigProvider.config({
  theme: {
    primaryColor: "#5760C9",
  },
});
