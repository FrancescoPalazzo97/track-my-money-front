import { Outlet } from "react-router-dom"
import Header from "../components/organisms/Header"

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className="pt-[76px]">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout
