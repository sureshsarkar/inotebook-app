import { Link, useLocation, useNavigate } from "react-router-dom";

const Nabbar = (props) => {
    const history = useNavigate();
    const handelLogout = ()=>{
        localStorage.removeItem('token');
        props.showAlert("Logout successfully", "success");
        history('/login');
    }
    let location = useLocation();

    return (
        <>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`} to="/contact">Contact</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className="btn btn-light mx-1" role="button" to="/login">Login</Link>
                            <Link className="btn btn-light mx-1" role="button" to="/signup">Signup</Link></form> :
                            <button className="btn btn-light mx-1" onClick={handelLogout} role="button">Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nabbar;