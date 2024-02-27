export default function SignIngLogo({children}) {
    return (
        <>
            <div className="flex justify-center mx-auto">
                <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                {children}
            </p>
        </>
    )
}