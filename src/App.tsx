import { useState } from 'react'
import './App.css'
import {RootLayout} from "./components/RootLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Crop} from "./pages/Crop.tsx";
import {Field} from "./pages/Field.tsx";
import {Vehicle} from "./pages/Vehicle.tsx";
import {Equipment} from "./pages/Equipment.tsx";
import {Staff} from "./pages/Staff.tsx";
import {Logs} from "./pages/Logs.tsx";

function App() {

  const routes = createBrowserRouter([
    {
      path: '',
      element : <RootLayout/>,
      children : [
        { path : '', element : <Dashboard/>},
        { path : '/crop', element : <Crop/>},
        { path : '/fields', element : <Field/>},
        { path : '/vehicles', element : <Vehicle/>},
        { path : '/equipment', element : <Equipment/>},
        { path : '/staff', element : <Staff/>},
        { path : '/logs', element : <Logs/>}
      ]
    },
  ])

  return (
      <>
        <RouterProvider router={routes} />
      </>
  );
}

export default App
