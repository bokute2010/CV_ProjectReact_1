import React from "react";
import { Card, CardHeader, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Loading } from "./LoadingComponent";
import { Link } from "react-router-dom";

function RenderStaffs({ staffs }) {
    const _staffs = staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-6 col-md-4 col-lg-3 p-2">
                <Link to={`/staff/${staff.id}`}>
                    <Card size='lg'>
                        <CardImg top width="100%" src={staff.image} alt={staff.name} />
                        <CardHeader className='text-center bg-info'>{staff.name}</CardHeader>
                    </Card>
                </Link>
            </div>
        );
    })
    return (

        <div className="row pt-4 " style={{ padding: '2vw' }}>
            {_staffs}
        </div>

    );
}

const DepartmentDetail = (props) => {
    if (props.department === undefined) {
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
                        <BreadcrumbItem><Link to='/department'><b>Phòng ban</b></Link></BreadcrumbItem>
                        <BreadcrumbItem active><b>{props.department.name}</b></BreadcrumbItem>
                    </Breadcrumb>

                </div>
                <RenderStaffs staffs={props.staffs} />
            </div>

        );
    }
}

export default DepartmentDetail;