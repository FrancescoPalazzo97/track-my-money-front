import { useShallow } from "zustand/shallow";
import BaseButton from "../ui/BaseButton";
import { store } from "../../store/store";
import { AlertCircle } from "lucide-react";

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
        <div className="space-y-6">
            {/* Icona e messaggio di errore */}
            <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-md leading-relaxed">{error}</p>
            </div>

            {/* Bottone di chiusura */}
            <div className="flex justify-end">
                <BaseButton
                    onClick={() => { closeModal(); clearError(); }}
                    variant="red"
                    hoverColor="red"
                >
                    Chiudi
                </BaseButton>
            </div>
        </div>
    )
}

export default ErrorContent
