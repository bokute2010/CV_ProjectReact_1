import React, { useState } from "react";

import {
    Card, CardHeader, CardFooter, CardBody,
    Table, Breadcrumb, BreadcrumbItem, Button, DropdownToggle,
    DropdownMenu, DropdownItem, Alert, Modal, ModalHeader,
    ModalBody, Label, Row, Col, FormGroup
} from 'reactstrap';
import { Link } from "react-router-dom";

//@Function render salary table
function RenderSalaryTable({ salaries, staff, month }) {

    const employees = salaries.map((salary) => {
        const salaryCash = (3000000 * staff.salaryScale) + (salary.overTime * 200000)
        return (
            <div key={salary._id} className="col-12 col-sm-6 col-md-4  p-4">
                <Card>
                    <CardHeader>Tháng: {salary.month}</CardHeader>
                    <CardBody>
                        <Table borderless hover>
                            <tbody>
                                <tr>
                                    <th scope="row">Hệ số lương</th>
                                    <td>{staff.salaryScale}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Ngày làm thêm giờ</th>
                                    <td>{salary.overTime}</td>
                                </tr>

                                {/* <tr>
                                    <th scope="row">Giờ làm thêm</th>
                                    <td>{staff.overTime}</td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Lương</th>
                                    <td>
                                        <i className="fa fa-money" aria-hidden="true"></i> {salaryCash.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {<sup>đ</sup>}
                                    </td>
                                </tr>
                            </tbody>
                            <hr />
                            <tfoot>
                                <tr>
                                    <th><Button color="info" block>Sửa</Button></th>
                                    <td><Button color="info" block>Xóa</Button></td>
                                </tr>
                            </tfoot>
                        </Table>
                        
                        
                    </CardFooter>
                </Card>
            </div>
        );

    })

    

    return (
        <React.Fragment>
            <div className="row" >
                <Breadcrumb className='col-md-12' style={{ padding: '2vw 3vw 0 3vw' }}>
                    <BreadcrumbItem><Link to='/salary'><b>Bảng lương</b></Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/salary/${staff._id}`}><b>{staff.name}</b></Link></BreadcrumbItem>
                    {month ? <><BreadcrumbItem active><b>{"Tháng " + salaries[0].month}</b></BreadcrumbItem></> : null}
                </Breadcrumb>
            </div>

            <div className="row" style={{ padding: '0 2vw' }}>
                {employees}
            </div>

        </React.Fragment>

    );



}


const SalaryResults = (props) => {

    return (
        
        <RenderSalaryTable s salaries={props.salaries} staff={props.staff} month={props.month}/>
    )
}

export default SalaryResults;