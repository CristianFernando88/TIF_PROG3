import { Outlet } from "react-router-dom";
import Profile from "../components/Profile/Profile";

export default function LayoutAccount(){
    return(
        <>
            <Profile>
                <Outlet/>
            </Profile>
        </>
    )

};