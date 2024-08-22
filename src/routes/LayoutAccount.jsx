import { Outlet } from "react-router-dom";
import Profile from "../components/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
export default function LayoutAccount(){
    return(
        <>
            <ProtectedRoute>
                <Profile>
                    <Outlet/>
                </Profile>
            </ProtectedRoute>      
        </>
    )

};