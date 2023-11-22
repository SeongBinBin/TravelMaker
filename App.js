import React from "react";
import StackNavigator from "./src/Components/StackNavigator";
import { AuthProvider } from "./src/utils/AuthContext";

export default function App(){
  return(
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  )
}
