import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,

        };
        this.toggleNav = this.toggleNav.bind(this)
    }
    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }
    render() {
        return (
            <Navbar dark className='navbar-light' style={{ backgroundColor: "#17a2b8" }} expand="md">
                <div className='container'>
                    <LinkContainer to='/'>
                        <NavbarBrand className='mr-auto'>
                            <img src="/asset/images/logo.png" alt='staff logo' />
                        </NavbarBrand>
                    </LinkContainer>

                    <NavbarToggler onClick={this.toggleNav} />

                    <Collapse isOpen={this.state.isNavOpen} navbar >
                        <Nav navbar className="text-center ml-auto" >
                            <NavItem className='px-3 '>
                                <NavLink className='nav-link' to={'/staff'}>
                                    <span className='fa fa-users'></span> Nhân viên
                                </NavLink>
                                <div className="divider"></div>
                            </NavItem>

                            <NavItem className='px-3  '>
                                <NavLink className='nav-link' to={'/department'}>
                                    <span className='fa fa-building'></span> Phòng ban
                                </NavLink>
                                <div className="divider"></div>
                            </NavItem>
                            <NavItem className='px-3 '>
                                <NavLink className='nav-link' to={'/salary'}>
                                    <span className='fa fa-credit-card-alt'></span> Bảng lương
                                </NavLink>

                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>
        );
    }
}

export default Header;