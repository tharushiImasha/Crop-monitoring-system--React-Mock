import { useState } from 'react'
import './App.css'
import {RootLayout} from "./components/RootLayout.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./pages/Login.tsx";
import {Dashboard} from "./pages/Dashboard.tsx";
import {Crops} from "./pages/Crops.tsx";
import {Fields} from "./pages/Fields.tsx";
import {Vehicles} from "./pages/Vehicles.tsx";
import {Equipments} from "./pages/Equipments.tsx";
import {Staffs} from "./pages/Staffs.tsx";
import {Logs} from "./pages/Logs.tsx";
import {Profile} from "./pages/Profile.tsx";
import {Register} from "./pages/Register.tsx";

function App() {

  const routes = createBrowserRouter([
    {
      path: '',
      element : <RootLayout/>,
      children : [
        { path : '', element : <Login/>},
        { path : '/register', element : <Register/>},
        { path : '/dashboard', element : <Dashboard/>},
        { path : '/crop', element : <Crops/>},
        { path : '/fields', element : <Fields/>},
        { path : '/vehicles', element : <Vehicles/>},
        { path : '/equipment', element : <Equipments/>},
        { path : '/staff', element : <Staffs/>},
        { path : '/logs', element : <Logs/>},
        { path : '/profile', element : <Profile/>}
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
