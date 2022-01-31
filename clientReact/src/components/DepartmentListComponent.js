import React from "react";
import { Card, CardHeader, CardBody, Table, Breadcrumb, BreadcrumbItem, Alert } from 'reactstrap';
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
function RenderDeparment({ departments, isLoading, errMess }) {

    const _departments = departments.map((department) => {
        return (
            <div key={department.id} className="col-12 col-sm-6 col-lg-4 p-4">
                <Link to={`/department/${department.id}`}>
                    <Card>
                        <CardHeader>{department.name}</CardHeader>
                        <CardBody>
                            <Table borderless hover>
                                <tbody>
                                    <tr>
                                        <th scope="row">Số lượng nhân viên</th>
                                        <td>{department.numberOfStaff}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Link>
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

            <RenderDeparment isLoading={props.departmentsLoading} errMess={props.departmentsErrMess} departments={props.departments} />

        </React.Fragment>
    );
}

export default DepartmentList;