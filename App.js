import React from "react";
import StackNavigator from "./src/Components/StackNavigator";
import { AuthProvider } from "./src/AuthContext";

function App(){
  return(
    <AuthProvider>
      <StackNavigator />
    </AuthProvider>
  )
}
export default App