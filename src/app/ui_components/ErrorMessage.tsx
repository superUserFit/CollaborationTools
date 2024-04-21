interface ErrorMessageProps {
    message: string;
    //className: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return (
        <div className='bg-red-500 dark:bg-red-600 p-1 px-2 pl-4 border-white border-destructive rounded-md text-gray-100 dark:text-gray-200'>
            <h1 className="font-semibold">Error</h1>
            <p className="text-sm py-2">{message}</p>
        </div>
    );
}

export default ErrorMessage;
