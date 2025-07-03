const NotFoundView = () => {
    return ( <>
        <div className="h-100 w-100 d-flex justify-content-center align-items-center">
            <div className="">
                <div className="text-center mb-2 opacity-50"><i className="fa-solid fa-warning text-danger fa-4x"></i></div>
                <div className="fs-3 mb-2 opacity-50">Page was not found</div>
                <div className="text-center">
                    <a href="/">Back to home</a>
                </div>
            </div>
        </div>
    </> );
}
 
export default NotFoundView;