import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Modal from "../components/Modal";

const DefaultLayout = () => {

    return (
        <>
            <Header />
            <Modal />
            <main className="min-h-screen pt-[96px]">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout
