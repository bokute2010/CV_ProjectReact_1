import React, { useState } from "react";
import {
    Table, Card, CardHeader, CardBody, CardImg, Breadcrumb,
    BreadcrumbItem, CardFooter, Button,
    FormGroup, Col, Modal, ModalHeader, ModalBody, Label, Row, Alert
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Loading } from "./LoadingComponent";

// Handle validate của modal form to create new staff
const required = (val) => val;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const validDate = (val) => (new Date(val).getTime() < new Date().getTime()) && (parseInt(new Date(val).getFullYear()) > 1900);
const validPositive = (val) => (val >= 0) && !isNaN(val);


function RenderStaff({ staff, department, history, deleteStaff, updateStaff, staffsIsLoading, staffsErrMess, departmentsIsLoading, departmentsErrMess }) {
    // Hook xử lý đóng mở modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    if (staff == null) {
        return (<div></div>);
    }

    const handleDelete = (staff) => {


        deleteStaff(staff.id)
        history.push('/');


    }

    // Xử lý khi submit form
    const handleSubmit = (values) => {

        // Xử lý dữ liệu khi user select department, _dpm lưu giá trị của department của staff mới
        let _dpm = '';
        switch (values.department) {
            case 'Sale':
                _dpm = 'Dept01'
                break;
            case 'HR':
                _dpm = 'Dept02'
                break;
            case 'Marketing':
                _dpm = 'Dept03'
                break;
            case 'IT':
                _dpm = 'Dept04'
                break;
            case 'Finance':
                _dpm = 'Dept05'
                break;

            default:
                break;
        }

        const salary = parseInt((values.salaryScale * 3000000) + (values.overTime * 200000));

        // Dựa vào values của form gửi tới để tạo ra object staff mới
        const newStaff = {
            id: staff.id,
            name: values.name,
            doB: new Date(values.doB).toISOString(),
            salaryScale: values.salaryScale,
            startDate: new Date(values.startDate).toISOString(),
            departmentId: _dpm,
            annualLeave: values.annualLeave,
            overTime: values.overTime,
            image: '/asset/images/alberto.png',
            salary: salary

        };
        updateStaff(newStaff)
        // console.log(newStaff)
    }

    if (staffsIsLoading || departmentsIsLoading) {
        return (
            <div className="row pt-4" >
                <Loading />
            </div>

        )
    }
    else if (staffsErrMess) {
        // console.log(JSON.stringify(errMess))
        return (
            <div className="row pt-4" >
                <div className="col-12 ">
                    <Alert color="danger">
                        {staffsErrMess}
                    </Alert>

                </div>
            </div>

        );
    } else {
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='col-12 col-sm-4 col-md-3'>
                        <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                            <Card className="d-flex">
                                <CardImg className='img-fluid' top width="100%" src={staff.image} alt={staff.name} />
                            </Card>
                        </FadeTransform>
                    </div>
                    <div className="col-12 col-sm-8 col-md-9"  >
                        <Card className="d-flex">
                            <CardHeader className="text-white bg-info" tag="h5">{staff.name}</CardHeader>
                            <CardBody>

                                <Table borderless hover>
                                    <tbody>
                                        <Stagger in>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Phòng Ban</th>
                                                    <td>{department.name}</td>
                                                </tr>
                                            </Fade>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Ngày sinh</th>
                                                    <td>{dateFormat(staff.doB, "paddedShortDate")}</td>

                                                </tr>
                                            </Fade>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Ngày vào công ty</th>
                                                    <td>{dateFormat(staff.startDate, "paddedShortDate")}</td>

                                                </tr>
                                            </Fade>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Hệ số lương</th>
                                                    <td>{staff.salaryScale}</td>

                                                </tr>
                                            </Fade>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Ngày nghỉ còn lại</th>
                                                    <td>{staff.annualLeave}</td>

                                                </tr>
                                            </Fade>
                                            <Fade in>
                                                <tr>
                                                    <th scope="row">Ngày làm thêm giờ</th>
                                                    <td>{staff.overTime}</td>

                                                </tr>
                                            </Fade>
                                        </Stagger>
                                    </tbody>
                                </Table>

                            </CardBody>
                            <CardFooter>

                                <div className='row'>
                                    <div className='col-0 col-md-6'>

                                    </div>
                                    <div className='col-6 col-md-3 ml-auto'>
                                        <Button onClick={toggle} color='info' size="lg" block>Sửa</Button>
                                    </div>
                                    <div className='col-6 col-md-3 ml-auto'>
                                        <Button onClick={() => handleDelete(staff)} color='danger' size="lg" block>Xóa</Button>
                                    </div>
                                </div>

                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                    <ModalHeader className='modal-header' toggle={toggle}><strong>{staff.name}</strong></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Stagger in >
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="name" className='font-weight-bold' md={3}>Họ tên</Label>
                                        <Col md={9}>
                                            <Control.text model=".name" className='form-control'
                                                placeholder='Nhập tên nhân viên'
                                                defaultValue={staff.name}
                                                name='name' id='name'
                                                validators={{
                                                    required,
                                                    maxLength: maxLength(30),
                                                    minLength: minLength(3)
                                                }}
                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.name'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                maxLength: 'Tối đa 30 ký tự',
                                                minLength: 'Tối thiểu 3 ký tự',
                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="doB" className='font-weight-bold' md={3}>Ngày sinh</Label>
                                        <Col md={9}>
                                            <Control.text type='date' model=".doB"
                                                defaultValue={dateFormat(staff.doB, "yyyy-mm-dd")}
                                                placeholder='dd/mm/yyyy'
                                                name='doB' id='doB'
                                                className='form-control'
                                                validators={{
                                                    required,
                                                    validDate
                                                }}
                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.doB'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                validDate: 'Ngày sinh không hợp lệ'
                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="startDate" className='font-weight-bold' md={3}>Ngày vào công ty</Label>
                                        <Col md={9}>
                                            <Control.text type='date' model=".startDate"
                                                placeholder='dd/mm/yyyy'
                                                defaultValue={dateFormat(staff.startDate, "yyyy-mm-dd")}

                                                name='startDate' id='startDate'
                                                className='form-control'
                                                validators={{
                                                    required,
                                                    validDate
                                                }}
                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.startDate'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                validDate: 'Ngày gia nhập không hợp lệ!'
                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>

                                    <Row className='form-group'>
                                        <Label md={3} className='font-weight-bold' htmlFor='department'>Phòng ban</Label>
                                        <Col md={9}>
                                            <Control.select model='.department' defaultValue={department.name} className='form-control' validators={{ required }}>
                                                <option value='Sale'>Sale</option>
                                                <option value='HR'>HR</option>
                                                <option value='Marketing'>Marketing</option>
                                                <option value='IT'>IT</option>
                                                <option value='Finance'>Finance</option>
                                            </Control.select>

                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.department'
                                            show='touched'
                                            messages={{
                                                required: 'Chưa chọn phòng ban!',

                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="salaryScale" className='font-weight-bold' md={3}>Hệ số lương</Label>
                                        <Col md={9}>
                                            <Control.text model=".salaryScale"
                                                name='salaryScale' id='salaryScale'
                                                className='form-control'

                                                defaultValue={staff.salaryScale}
                                                validators={{
                                                    required,
                                                    validPositive
                                                }}

                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.salaryScale'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                validPositive: 'Hệ số lương không hợp lệ!'
                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="annualLeave" className='font-weight-bold' md={3}>Ngày nghỉ còn lại</Label>
                                        <Col md={9}>
                                            <Control.text model=".annualLeave"
                                                className='form-control'
                                                name='annualLeave' id='annualLeave'
                                                defaultValue={staff.annualLeave}
                                                validators={{
                                                    required,
                                                    validPositive
                                                }}
                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.annualLeave'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                validPositive: 'Hệ số lương không hợp lệ!'
                                            }}

                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="overTime" className='font-weight-bold' md={3}>Ngày làm thêm giờ</Label>
                                        <Col md={9}>
                                            <Control.text model=".overTime"
                                                className='form-control'
                                                name='overTime' id='overTime'

                                                defaultValue={staff.overTime}
                                                validators={{
                                                    required,
                                                    validPositive
                                                }}
                                            />
                                        </Col>
                                        <Errors
                                            className='text-danger'
                                            model='.overTime'
                                            show='touched'
                                            messages={{
                                                required: 'Không được bỏ trống!',
                                                validPositive: 'Giá trị không hợp lệ!'
                                            }}
                                        />
                                    </Row>
                                </Fade>
                                <Fade in>
                                    <FormGroup row>
                                        <Col md={{ size: 9, offset: 3 }}>
                                            <Button block type="submit" size='lg' color="info">
                                                Xác nhận
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Fade>
                            </Stagger>
                        </LocalForm>
                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }

}

const StaffDetail = (props) => {
    let history = useHistory();


    if (props.staff === undefined) {
        // setTimeout(() => {

        //     history.push('/none-exist-staff')


        // }, 10000);
        return (
            <div className='container pt-3'>
                <div className="row pt-4" >
                    <Loading />
                </div>
            </div>
        );

    } else {
        return (
            <div style={{ padding: '2vw' }}>
                <div className="row " >
                    <Breadcrumb className='col-md-12'>
                        <BreadcrumbItem><Link to='/'><b>Nhân viên</b></Link></BreadcrumbItem>
                        <BreadcrumbItem active><b>{props.staff.name}</b></BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <RenderStaff
                    staffsIsLoading={props.staffsLoading}
                    staffsErrMess={props.staffsErrMess}

                    departmentsIsLoading={props.departmentsLoading}
                    departmentsErrMess={props.departmentsErrMess}


                    updateStaff={props.updateStaff}
                    history={history}
                    deleteStaff={props.deleteStaff}
                    staff={props.staff}
                    department={props.departments.find((department) => department.id === props.staff.departmentId)}
                />
            </div>

        );


    }

}

export default StaffDetail;