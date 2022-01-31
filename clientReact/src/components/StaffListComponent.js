import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Card, CardImg, CardHeader, Input, Button, Form,
    FormGroup, Col, Modal, ModalHeader, ModalBody, Label, Row,
    Alert
} from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from "react-redux";
import { FadeTransform, Fade, Stagger } from 'react-animation-components'
import { Loading } from "./LoadingComponent";

// Handle validate của modal form to create new staff
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const validDate = (val) => (new Date(val).getTime() < new Date().getTime()) && (parseInt(new Date(val).getFullYear()) > 1900);
const validPositive = (val) => (val >= 0) && !isNaN(val);


function RenderStaffList({ staffs, isLoading, errMess }) {

    const _staffs = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 p-2">
                <Link to={`/staff/${staff.id}`}>
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateY(-50%)'
                        }}>
                        <Card size='lg'>
                            <CardImg top width="100%" src={staff.image} alt={staff.name} />
                            <CardHeader className='text-center bg-info'>{staff.name}</CardHeader>
                        </Card>
                    </FadeTransform>
                </Link>
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
            <div className="row pt-4" >
                {_staffs}
            </div>

        );
    }
}

const StaffList = (props) => {

    //Search input hook
    const [searchInput, setSearchInput] = useState("")

    //Tạo array chứa các staff được lọc thông qua search
    const newStaffs = props.staffs.staffs.filter(function (staff) {

        if (searchInput === '') {
            return staff;
        }
        else if (staff.name.toLowerCase().includes(searchInput.toLowerCase())) {

            return staff;
        } else {
            return null
        }
    })

    // Xử lý click search
    const handleSearch = (event) => {
        setSearchInput(search.current.value)
        event.preventDefault()
        search.current.value = ""

    }


    // Tạo biến search để lưu giá trị innerRef trong input search
    let search = React.createRef();


    // Hook xử lý đóng mở modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    // Xử lý khi submit form
    const handleSubmit = (values) => {

        // Xử lý dữ liệu khi user select department, _dpm lưu giá trị của department của staff mới
        let _dpm = '';
        switch (values.department) {
            case 'sale':
                _dpm = 'Dept01'
                break;
            case 'hr':
                _dpm = 'Dept02'
                break;
            case 'marketing':
                _dpm = 'Dept03'
                break;
            case 'it':
                _dpm = 'Dept04'
                break;
            case 'finance':
                _dpm = 'Dept05'
                break;

            default:
                break;
        }

        const salary = parseInt((values.salaryScale * 3000000) + (values.overTime * 200000));
        console.log(salary)
        // Dựa vào values của form gửi tới để tạo ra object staff mới
        const newStaff = {

            name: values.name,
            doB: new Date(values.doB).toISOString(),
            salaryScale: parseInt(values.salaryScale),
            startDate: new Date(values.startDate).toISOString(),
            departmentId: _dpm,
            annualLeave: parseInt(values.annualLeave),
            overTime: parseInt(values.overTime),
            image: '/asset/images/alberto.png',
            salary: salary

        };
        // Truyền staff mới vào dismatch để chạy action bên reducer
        props.postStaff(newStaff)
        // console.log(props.addStaff)

    }

    return (
        <div style={{ padding: '3vw' }}>

            <div className='row pt-3'>
                <div className="col-12 col-md-6 col-lg-4 mr-auto">
                    <Button outline onClick={toggle} ><span className="fa fa-address-card-o fa-lg"></span>{' '}Thêm nhân viên</Button>
                </div>

                <div className='col-12 col-md-6 col-lg-4 ml-auto p-3' >
                    <Form onSubmit={handleSearch}>
                        <FormGroup row>
                            <Col>
                                <Input md={10}
                                    name="search"
                                    id="search"
                                    className='input-lg'
                                    placeholder="Tìm kiếm nhân viên"
                                    type='text'
                                    innerRef={search}
                                />
                            </Col>
                            <Button type="submit" md={2} color='info'>Tìm kiếm</Button>
                        </FormGroup>
                    </Form>
                </div>

                <Modal isOpen={modal} toggle={toggle} className="modal-lg">
                    <ModalHeader className='modal-header' toggle={toggle}> <strong>Thêm nhân viên mới </strong></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => handleSubmit(values)}>
                            <Stagger in>
                                <Fade in>
                                    <Row className='form-group'>
                                        <Label htmlFor="name" className='font-weight-bold' md={3}>Họ tên</Label>
                                        <Col md={9}>
                                            <Control.text model=".name" className='form-control'
                                                placeholder='Nhập tên nhân viên'
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
                                            <Control.select model='.department' defaultValue='sale' className='form-control' validators={{ required }}>
                                                <option value='sale'>Sale</option>
                                                <option value='hr'>HR</option>
                                                <option value='marketing'>Marketing</option>
                                                <option value='it'>IT</option>
                                                <option value='finance'>Finance</option>
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
                                                defaultValue='1'
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
                                                defaultValue='0'
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
                                                defaultValue='0'
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
            </div>
            <div id='success-add-staff' style={{ display: 'none' }} className='row pt-3'>
                <Alert color="success">
                    Thêm nhân viên thành công.
                </Alert>
            </div>

            <div className="row pt-5" >
                <div className='col-12'>
                    <h3 className='text-center font-weight-bold'>DANH SÁCH NHÂN VIÊN</h3>
                    <hr />
                </div>
            </div>

            <RenderStaffList staffs={newStaffs} isLoading={props.staffsLoading} errMess={props.staffsErrMess} />
        </div>

    );

};


// Map state từ store vào component này
const mapStateToProps = state => {
    return {
        staffs: state.staffs,
        departments: state.departments
    }
}

export default connect(mapStateToProps)(StaffList);