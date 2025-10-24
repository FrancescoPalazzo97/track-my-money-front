import { Outlet } from "react-router-dom";
import Header from "../components/organisms/Header";
import { useEffect } from "react";
import { store } from "../store/store";
import Modal from "../components/organisms/Modal";

const DefaultLayout = () => {

    const fetchTransactions = store(s => (s.fetchTransactions));
    const fetchCategories = store(s => (s.fetchCategories));

    useEffect(() => {
        fetchTransactions({
            startDate: '2025-10-01',
            endDate: '2025-10-31',
            baseCurrency: 'EUR'
        });
        fetchCategories();
    }, []);

    return (
        <>
            <Modal />
            <Header />
            <main className="min-h-screen pt-[96px]">
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout
