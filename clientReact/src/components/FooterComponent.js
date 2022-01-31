import React, { Component } from "react";
import { Link } from "react-router-dom";



class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="footer bg-light">
                <div className="container py-4">
                    {/* Footer 1 */}
                    <div className="row d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                        <div className="col-md-6 me-5 d-none d-lg-block">
                            <span>Liên kết với Funix qua các phương tiện Social:</span>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-facebook-f"></i>
                                    </Link>
                                </div>

                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-twitter"></i>
                                    </Link>
                                </div>

                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-github"></i>
                                    </Link>

                                </div>

                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-google"></i>
                                    </Link>

                                </div>

                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-instagram"></i>
                                    </Link>

                                </div>

                                <div className="col-2 col-md-2">
                                    <Link to="/" className="me-4 text-reset">
                                        <i className="fa fa-linkedin"></i>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container text-center text-md-start mt-5">

                    <div className="row mt-3">

                        <div className="col-md-4  mx-auto mb-4 ">

                            <h6 className="text-uppercase font-weight-bold mb-4">
                                <i className="fa fa-graduation-cap me-3"></i> Funix education
                            </h6>
                            <p className='text-justify'>
                                Bài Assignment 02 môn React JS của học viên <strong>Quân Lê Bá</strong>.
                                Mã số  FX12493 hiện đang học khóa Doanh nghiệp tài trợ của FUNIX
                            </p>
                        </div>



                        <div className="col-md-4  mx-auto mb-4">

                            <h6 className="text-uppercase font-weight-bold mb-4">
                                PAGES
                            </h6>
                            <p>
                                <Link to='/staff' className="text-reset">
                                    Nhân viên
                                </Link>
                            </p>
                            <p>
                                <Link to='/department' className="text-reset">
                                    Phòng ban
                                </Link>
                            </p>
                            <p>
                                <Link to='/salary' className="text-reset">
                                    Bảng lương
                                </Link>
                            </p>

                        </div>







                        <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase font-weight-bold mb-4">
                                Liên hệ
                            </h6>
                            <p><i className="fa fa-home me-3"></i> Tầng 0, tòa nhà FPT, 17 Duy Tân, Q. Cầu Giấy, Hà Nội</p>

                            <p>
                                <i className="fa fa-envelope me-3"></i>
                                info@funix.edu.vn
                            </p>
                            <p><i className="fa fa-phone me-3"></i> +84 782313602 (Zalo, Viber)</p>

                        </div>

                    </div>

                </div>

                {/* Footer 2 */}
                <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                    © 2021 Copyright:
                    <a target='_blank' rel="noopener noreferrer" className="text-reset font-weight-bold" href="https://www.facebook.com/thaydoisomenh/"> QUANLBFX12493</a>
                </div>
            </div>
        );
    }
}

export default Footer;