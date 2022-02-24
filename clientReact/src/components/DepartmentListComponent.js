import React, { useState } from "react";
import { ModalFooter, Card, CardHeader, CardBody, Table, Breadcrumb, BreadcrumbItem, Alert, Button, Modal, ModalHeader, ModalBody, Row, Label, Col, FormGroup } from 'reactstrap';
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { Control, Errors, LocalForm } from "react-redux-form";

const required = (val) => val && val.length;

//Add department
function RenderAddDepartment({ createDepartment }) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handleSubmit = (values) => {

        const newDepartment = {
            name: values.name
        }

        createDepartment(newDepartment);
    }

    return (
        <>
            <Button variant="primary" onClick={toggle}>
                New Department
            </Button>

            <Modal isOpen={modal} toggle={toggle} size="lg">
                <ModalHeader toggle={toggle}>
                    Create Department
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="name" className="font-weight-bold" md={3}>Name</Label>
                            <Col md={9}>
                                <Control.text
                                    model=".name"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    validators={{
                                        required
                                    }}
                                />
                            </Col>
                            <Errors className="text-danger" model=".name" show="touched"
                                messages={{
                                    required: "Can be blank!"
                                }}
                            />
                        </Row>

                        <FormGroup row>
                            <Col md={{ size: 9, offset: 3 }}>
                                <Button block size="lg" type="submit" color="info">
                                    Create
                                </Button>
                            </Col>
                        </FormGroup>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
    );

}



function RenderDeparment({ deleteDepartment, staffs, departments, isLoading, errMess }) {
    //React hook of delete department
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const _departments = departments.map((department) => {
        // Đếm số nhân viên cùng 1 department
        const _staffs = staffs.staffs.filter(staff => staff.departmentId === department._id)

        const handleDelDepartment = () => {
            deleteDepartment(department._id)
        }


        return (
            <div key={department.id} className="col-12 col-sm-6 col-lg-4 p-4">
                <Card>
                    <CardHeader>{department.name} <i onClick={toggle} class="fa fa-trash" aria-hidden="true"></i></CardHeader>
                    <Link to={`/department/${department._id}`}>
                        <CardBody>
                            <Table borderless hover>
                                <tbody>
                                    <tr>
                                        <th scope="row">Số lượng nhân viên</th>
                                        <td>{_staffs.length}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Link>
                </Card>

                <div>
                    <Modal isOpen={modal} toggle={toggle} className={{}}>
                        <ModalHeader toggle={toggle}>Delete department</ModalHeader>
                        <ModalBody>
                            Are you sure want to delete <strong>{department.name}</strong> department?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={handleDelDepartment}>Delete</Button>{' '}
                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    })

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (errMess) {
        return (
            <div className="col-12 ">
                <Alert color="danger">
                    {errMess}
                </Alert>
            </div>
        );
    } else {
        return (
            <div className="row " style={{ padding: '2vw' }}>
                {_departments}
            </div>
        );
    }
}

const DepartmentList = (props) => {

    return (
        <React.Fragment>
            <div className="row " style={{ padding: '2vw' }}>
                <Breadcrumb className='col-md-12'>
                    <BreadcrumbItem><Link to='/'><b>Nhân viên</b></Link></BreadcrumbItem>
                    <BreadcrumbItem active><b>Phòng ban</b></BreadcrumbItem>
                </Breadcrumb>
            </div>
            
            <div className="row " style={{ padding: '2vw' }}>
                <RenderAddDepartment createDepartment={props.createDepartment} />
            </div>

            <RenderDeparment deleteDepartment={props.deleteDepartment} isLoading={props.departmentsLoading} errMess={props.departmentsErrMess} departments={props.departments} staffs={props.staffs} />

        </React.Fragment>
    );
}


export default DepartmentList;
// export default connect(mapStateToProps)(DepartmentList);