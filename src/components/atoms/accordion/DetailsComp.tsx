import { useState } from "react"

type Props = {
    children: React.ReactNode | ((isOpen: boolean) => React.ReactNode)
}

const DetailsComp = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <details
            onClick={e => e.stopPropagation()}
            className="p-4"
            onToggle={(e) => setIsOpen(e.currentTarget.open)}
        >
            {typeof children === 'function' ? children(isOpen) : children}
        </details>
    )
}

export default DetailsComp
