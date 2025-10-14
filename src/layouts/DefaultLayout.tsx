import { Outlet } from "react-router-dom"
import Header from "../components/organisms/Header"

const DefaultLayout = () => {
    return (
        <>
            <Header />
            <main className="pt-[52px]">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout
