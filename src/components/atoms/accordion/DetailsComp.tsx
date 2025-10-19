type Props = {
    children: React.ReactNode
}

const DetailsComp = ({ children }: Props) => {
    return (
        <details className="group p-4">
            {children}
        </details>
    )
}

export default DetailsComp
