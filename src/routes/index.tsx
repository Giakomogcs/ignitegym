import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme, Box } from "native-base";

import { AuthContext } from "@contexts/AuthContext";
import { useContext } from "react";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const contextData = useContext(AuthContext);
  console.log(contextData);

  const { colors } = useTheme();
  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];
  return (
    <Box flex={1} bg={"gray.700"}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </Box>
  );
}
