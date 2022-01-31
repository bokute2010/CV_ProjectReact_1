import React, { useState } from "react";
import {
    Card, CardHeader, CardFooter, CardBody,
    Table, Breadcrumb, BreadcrumbItem, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem, Alert
} from 'reactstrap';
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";


function RenderSalaryTable({ staffs, isLoading, errMess }) {
    console.log(errMess);
    const employees = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4  p-4">
                <Card>
                    <CardHeader>{staff.name}</CardHeader>
                    <CardBody>
                        <Table borderless hover>
                            <tbody>
                                <tr>
                                    <th scope="row">Mã nhân viên</th>
                                    <td>{staff.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hệ số lương</th>
                                    <td>{staff.salaryScale}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Giờ làm thêm</th>
                                    <td>{staff.overTime}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Lương</th>
                                    <td>
                                        <i className="fa fa-money" aria-hidden="true"></i> {staff.salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {<sup>đ</sup>}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardFooter>
                </Card>
            </div>
        );

    })

    if (isLoading) {
        return (
            <div className="row pt-4" >
                <Loading />
            </div>

        )
    }
    else if (errMess) {
        // console.log(JSON.stringify(errMess))
        return (
            <div className="row pt-4" >
                <div className="col-12 ">
                    <Alert color="danger">
                        {errMess}
                    </Alert>

                </div>
            </div>

        );
    } else {
        return (
            <React.Fragment>

                <div className="row" style={{ padding: '0 2vw' }}>
                    {employees}
                </div>

            </React.Fragment>

        );
    }


}


const Salary = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (

        <div>
            <div className="row" >
                <Breadcrumb className='col-md-12' style={{ padding: '2vw 3vw 0 3vw' }}>
                    <BreadcrumbItem><Link to='/'><b>Nhân viên</b></Link></BreadcrumbItem>
                    <BreadcrumbItem active><b>Lương</b></BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="row" style={{ padding: '0 3vw' }}>
                <Dropdown className="ml-auto" isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle color='info' caret>
                        Mã nhân viên
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => <RenderSalaryTable staffs={props.staffsSalary.sort((a, b) => { return parseInt(a.id) - parseInt(b.id); })} />}>Tăng dần</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => <RenderSalaryTable staffs={props.staffsSalary.sort((a, b) => { return parseInt(b.id) - parseInt(a.id); })} />}>Giảm dần</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <RenderSalaryTable isLoading={props.salaryLoading} errMess={props.salaryErrMess} staffs={props.staffsSalary} />
        </div>
    );

}

export default Salary;