type Props = {
    content: string
}

const EmptyListComponent = ({ content }: Props) => {
    return (
        <div className='text-center py-12'>
            <p className='text-slate-400'>{content}</p>
        </div>
    )
}

export default EmptyListComponent