import { createPortal } from "react-dom";
import { store } from "../../store/store";
import { useShallow } from "zustand/shallow";

const Modal = () => {

    const { isModalOpen, title, content } = store(
        useShallow(s => ({
            isModalOpen: s.isModalOpen,
            title: s.modalTitle,
            content: s.modalContent
        })))

    return isModalOpen && createPortal((
        <div className="bg-black/70 backdrop-blur-md p-4 fixed inset-0 flex justify-center items-center z-50">
            <div className="w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800/50 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
                    <h2 className="text-xl font-semibold text-slate-100">
                        {title}
                    </h2>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                    {content}
                </div>

                {/* Footer */}
                {/* <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-800/50 bg-slate-950/50">
                    <DefaultButton
                        onClick={undo}
                        variant="secondary"
                    >
                        Annulla
                    </DefaultButton>
                    <DefaultButton
                        onClick={done}
                        variant="emerald"
                    >
                        Conferma
                    </DefaultButton>
                </div> */}
            </div>
        </div>
    ), document.body)
}

export default Modal
