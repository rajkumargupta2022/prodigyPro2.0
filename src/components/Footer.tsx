import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className='container-xxl py-md-2 py-1'>
            <footer className="footer row px-md-5 py-2">
                <div className="col-md-6 py-1 text-md-start text-center">
                    Copyright © {new Date().getFullYear()} BFC Capital. All Rights Reserved
                </div>
                <div className="col-md-6 text-md-end text-center py-1">
                    <Link to={"/privacyPolicy"}>Privacy Policy</Link>
                    <span>&nbsp;&nbsp;</span>
                    {/* <a href="#">Terms & Conditions</a> */}
                </div>
            </footer>
        </div>
    );
};

export default Footer;
