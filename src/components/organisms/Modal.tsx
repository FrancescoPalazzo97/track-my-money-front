import { createPortal } from "react-dom"
import BaseButton from "../atoms/buttons/BaseButton"

type Props = {
    title: string,
    content: React.ReactNode,
    show: boolean,
    undo: () => void,
    done: () => void
}

const Modal = ({ title, content, show, undo, done }: Props) => {
    return createPortal((
        <div className="bg-black/50 backdrop-blur-xl p-4 absolute inset-0 flex justify-center items-center">
            <div className="max-w-[640px] bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50 ring-1 ring-slate-600/20 px-8 py-4">
                <div className={`text-center pb-4 border-b border-slate-700/30`}>
                    <span className={`text-slate-200 uppercase text-xl`}>{title}</span>
                </div>
                <div className=" py-4 border-b border-slate-700/30">
                    <span className="text-slate-200">{content}</span>
                </div>
                <div className="flex justify-center pt-4">
                    <BaseButton>
                        Conferma modifiche
                    </BaseButton>
                    <BaseButton>
                        Annulla modifiche
                    </BaseButton>
                </div>
            </div>
        </div>
    ), document.body
    )
}

export default Modal
