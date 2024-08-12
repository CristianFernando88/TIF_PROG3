import { Outlet } from "react-router-dom";
import HeroBody from "../components/HeroBody";
import HeaderNav from "../components/HeaderNav";
import FooterBar from "../components/FooterBar";
import { AuthProvider } from "../context/AuthContext";
export default function Layout() {
    return (
        <AuthProvider>
            <HeaderNav/>
            <HeroBody>
                <Outlet/>
            </HeroBody>
            <FooterBar/>
        </AuthProvider>
             
        );
        
   
}