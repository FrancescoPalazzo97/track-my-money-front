import { useShallow } from "zustand/shallow";
import BaseButton from "../ui/BaseButton";
import { store } from "../../store/store";

type Props = {
    error: string
}

const ErrorContent = ({ error }: Props) => {

    const { closeModal, clearError } = store(
        useShallow(s => ({
            closeModal: s.closeModal,
            clearError: s.clearError
        }))
    );

    return (
        <div>
            <p className="text-slate-200">{error}</p>
            <BaseButton
                onClick={() => { closeModal(); clearError(); }}
                variant="emerald"
            >
                Chiudi
            </BaseButton>
        </div>
    )
}

export default ErrorContent
