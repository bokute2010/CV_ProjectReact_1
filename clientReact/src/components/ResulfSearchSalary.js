import React, { useState } from "react";

import {
    Card, CardHeader, CardFooter, CardBody,
    Table, Breadcrumb, BreadcrumbItem, Button, DropdownToggle,
    DropdownMenu, DropdownItem, Alert, Modal, ModalHeader,
    ModalBody, Label, Row, Col, FormGroup
} from 'reactstrap';

//@Function render salary table
function RenderSalaryTable({ salaries, salaryScale }) {

    const employees = salaries.map((salary, salaryScale) => {
        const salaryCash = (3000000 * salaryScale) + (salary.overTime * 200000)
        return (

            <div key={salary._id} className="col-12 col-sm-6 col-md-4  p-4">
                <Card>
                    <CardHeader>Tháng: {salary.month}</CardHeader>
                    <CardBody>
                        <Table borderless hover>
                            <tbody>
                                <tr>
                                    <th scope="row">Hệ số lương</th>
                                    <td>{salaryScale}</td>
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
                        </Table>
                    </CardFooter>
                </Card>
            </div>
        );

    })


    return (
        <React.Fragment>

            <div className="row" style={{ padding: '0 2vw' }}>
                {employees}
            </div>

        </React.Fragment>

    );



}


const SalaryResults = (props) => {

    return (
        <RenderSalaryTable salaries={props.salaries} salaryScale={props.salaryScale} />
    )
}

export default SalaryResults;