import React, { useState } from "react";
import {
    Card, CardHeader, CardFooter, CardBody,
    Table, Breadcrumb, BreadcrumbItem, Button, DropdownToggle,
    DropdownMenu, DropdownItem, Alert, Modal, ModalHeader,
    ModalBody, Label, Row, Col, FormGroup
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Link, Redirect, useHistory } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import SalaryResults from "./ResulfSearchSalary";
import dateFormat from "dateformat";

const required = (val) => val && val.length;

function RenderSearchForm({ staffs }) {
    //React Hook model
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Select staffs value form.
    const staffSelect = staffs.map(staff => {
        return (
            <option value={staff._id}>{staff.name}</option>
        )
    })

    //Select months value form
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    const monthSelect = months.map(month => {
        if (month == 1) {
            return (
                <option selected value={month}>{month}</option>
            )
        }
        return (
            <option value={month}>{month}</option>
        )
    });

    const histoty = useHistory();
    const handleSubmit = (values) => {
        histoty.push(`/salary/${values.staffId}/${values.month}`);
    }

    return (
        <>
            <div style={{ padding: '2vw 3vw 0 3vw' }}>
                {/* <div className='row pt-3'> */}
                    <div className="col-6 col-md-6 col-lg-4 mr-auto">
                        <Button outline onClick={toggle} ><span className="fa fa-address-card-o fa-lg"></span>{'  '}Tìm nâng cao</Button>
                    </div>
                {/* </div> */}
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                <ModalHeader className='modal-header' toggle={toggle}> <strong>Tìm nâng cao</strong></ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Stagger in>
                            <Fade in>
                                <Row className='form-group'>
                                    <Label md={12} className='font-weight-bold' htmlFor='staffId'>Nhân viên</Label>
                                    <Col md={12}>
                                        <Control.select model='.staffId' className='form-control' validators={{ required }}>
                                            {staffSelect}
                                        </Control.select>
                                    </Col>
                                    <Errors
                                        className='text-danger'
                                        model='.staffId'
                                        show='touched'
                                        messages={{
                                            required: 'Chưa chọn nhân viên!',
                                        }}
                                    />
                                </Row>
                            </Fade>



                            <Fade in>
                                <Row className='form-group'>
                                    <Label md={12} className='font-weight-bold' htmlFor='month'>Tháng</Label>
                                    <Col md={12}>
                                        <Control.select model='.month' className='form-control' validators={{ required }}>
                                            {monthSelect}
                                        </Control.select>
                                    </Col>
                                    <Errors
                                        className='text-danger'
                                        model='.month'
                                        show='touched'
                                        messages={{
                                            required: 'Chưa chọn tháng!',
                                        }}
                                    />
                                </Row>
                            </Fade>


                            <Fade in>
                                <FormGroup row>
                                    <Col md={{ size: 9, offset: 3 }}>
                                        <Button block size='lg' type="submit" color="info">
                                            Kiểm tra lương
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Fade>
                        </Stagger>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>                           
        
    )
}

function RenderAddSalary({ staffs, createSalary }) {
    //React Hook model
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    //Select staffs value form
    const staffSelect = staffs.map(staff => {
        return (
            <option value={staff._id}>{staff.name}</option>
        )
    })

    //Select months value form
    const months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i)
    }
    const monthSelect = months.map(month => {
        return (
            <option value={month}>{month}</option>
        )
    });

    const handleSubmit = (values) => {
        const newSalary = {
            year: new Date().getFullYear(),
            month: values.month,
            staffId: values.staffId,
            overTime: values.overTime
        }
        createSalary(newSalary)
    };

    return (
        <>
            <div style={{ padding: '2vw 3vw 0 3vw' }}>
                {/* <div className='row pt-3'> */}
                    <div className="col-6 col-md-6 col-lg-4 mr-auto">
                        <Button outline onClick={toggle} ><span className="fa fa-address-card-o fa-lg"></span>{'  '}Cập nhật lương</Button>
                    </div>
                {/* </div> */}
            </div>
            <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                <ModalHeader className='modal-header' toggle={toggle}> <strong>Tạo bảng lương</strong></ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Stagger in>
                            <Fade in>
                                <Row className='form-group'>
                                    <Label md={3} className='font-weight-bold' htmlFor='staffId'>Nhân viên</Label>
                                    <Col md={9}>
                                        <Control.select model='.staffId' className='form-control' validators={{ required }}>
                                            {staffSelect}
                                        </Control.select>
                                    </Col>
                                    <Errors
                                        className='text-danger'
                                        model='.staffId'
                                        show='touched'
                                        messages={{
                                            required: 'Chưa chọn nhân viên!',
                                        }}
                                    />
                                </Row>
                            </Fade>

                            <Fade in>
                                <Row className='form-group'>
                                    <Label md={3} className='font-weight-bold' htmlFor='month'>Tháng</Label>
                                    <Col md={9}>
                                        <Control.select model='.month' className='form-control' validators={{ required }}>
                                            {monthSelect}
                                        </Control.select>
                                    </Col>
                                    <Errors
                                        className='text-danger'
                                        model='.month'
                                        show='touched'
                                        messages={{
                                            required: 'Chưa chọn tháng!',
                                        }}
                                    />
                                </Row>
                            </Fade>

                            <Fade in>
                                <Row className='form-group'>
                                    <Label htmlFor="salaryScale" className='font-weight-bold' md={3}>Ngày làm thêm giờ</Label>
                                    <Col md={9}>
                                        <Control.text model=".overTime"
                                            name='overTime' id='overTime'
                                            className='form-control'
                                            defaultValue='0'
                                            validators={{
                                                required
                                            }}
                                        />
                                    </Col>
                                    <Errors
                                        className='text-danger'
                                        model='.overTime'
                                        show='touched'
                                        messages={{
                                            required: 'Không được bỏ trống!',
                                            validPositive: 'Hệ số lương không hợp lệ!'
                                        }}

                                    />
                                </Row>
                            </Fade>
                            <Fade in>
                                <FormGroup row>
                                    <Col md={{ size: 9, offset: 3 }}>
                                        <Button block size='lg' type="submit" color="info">
                                            Tạo mới
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Fade>
                        </Stagger>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
    );
}

//@Function render salary table
function RenderSalaryTable({ staffs, isLoading, errMess }) {
    const employees = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-sm-6 col-md-4  p-4">
                <Card>
                    <CardHeader>{staff.name}</CardHeader>
                    <CardBody>
                        <Table borderless hover>
                            <tbody>
                                <tr>
                                    <th scope="row">Ngày vào công ty</th>
                                    <td>{dateFormat(staff.startDate, "dd-mm-yyyy")}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hệ số lương</th>
                                    <td>{staff.salaryScale}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                    <Link to={`/salary/${staff._id}`}>
                        <Button color="info">Xem lương</Button>
                    </Link>
                    
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

    return (

        <div>
            <div className="row" >
                <Breadcrumb className='col-md-12' style={{ padding: '2vw 3vw 0 3vw' }}>
                    <BreadcrumbItem><Link to='/'><b>Nhân viên</b></Link></BreadcrumbItem>
                    <BreadcrumbItem active><b>Lương</b></BreadcrumbItem>
                </Breadcrumb>
            </div>

            <RenderAddSalary createSalary={props.createSalary} staffs={props.staffs} />

            <RenderSearchForm staffs={props.staffs} />

            <RenderSalaryTable isLoading={props.salaryLoading} errMess={props.salaryErrMess} staffs={props.staffs} />


        </div>
    );

}

export default Salary;