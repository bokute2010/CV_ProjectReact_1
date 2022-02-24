import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Salary from './SalaryComponent';
import DepartmentList from './DepartmentListComponent';
import DepartmentDetail from './DepartmentDetail';
import StaffDetail from "./StaffDetailComponent";
import SalaryResults from './ResulfSearchSalary';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, deleteStaff, updateStaff } from '../redux/actionCreators/ActionCreators';
import { getSalary, createSalary } from '../redux/actionCreators/SalaryActions';
import { fetchDepartments, createDepartment, deleteDepartment } from "../redux/actionCreators/DepartmentActions";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    salaries: state.salaries
  }
}

const mapDispatchToProps = dispatch => ({
  postStaff: (staff) => dispatch(postStaff(staff)),
  fetchStaffs: () => { dispatch(fetchStaffs()) },
  deleteStaff: (staffId) => dispatch(deleteStaff(staffId)),
  updateStaff: (staff) => dispatch(updateStaff(staff)),

  fetchDepartments: () => { dispatch(fetchDepartments()) },
  createDepartment: (department) => { dispatch(createDepartment(department)) },
  deleteDepartment: (departmentId) => { dispatch(deleteDepartment(departmentId)) },

  getSalary: () => {dispatch(getSalary())},
  createSalary: (salaryInfo) => { dispatch(createSalary(salaryInfo)) },
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.getSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {

      return (
        <StaffDetail
          staff={this.props.staffs.staffs.find((staff) => staff._id === match.params.staffId)}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          departments={this.props.departments.departments}
          departmentsLoading={this.props.departments.isLoading}
          departmentsErrMess={this.props.departments.errMess}
          deleteStaff={this.props.deleteStaff}
          updateStaff={this.props.updateStaff}
        />
      );
    }

    const DepartmentWithId = ({ match }) => {
      return (
        <DepartmentDetail
          staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departmentId)}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          department={this.props.departments.departments.find((department) => department._id === match.params.departmentId)}
          departmentsLoading={this.props.departments.isLoading}
          departmentsErrMess={this.props.departments.errMess}
        />
      );
    }

    const SalaryWithStaffId = ({match}) =>{
      const salariesFiltered = this.props.salaries.salaries.filter((salary)=> salary.staffId === match.params.staffId && salary.month === parseInt(match.params.month));
      const staff = this.props.staffs.staffs.find((staff)=> staff._id === match.params.staffId);
      return (
        <SalaryResults salaries={salariesFiltered} salaryScale = {staff.salaryScale}/>   
      )
        
    }

    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames='page' timeout={500}>
            <Switch location={this.props.location}>
              <Route exact path='/staffs' component={() => <StaffList postStaff={this.props.postStaff} staffsLoading={this.props.staffs.isLoading} staffsErrMess={this.props.staffs.errMess} />} />
              <Route exact path='/salary' component={() => <Salary createSalary = {this.props.createSalary} staffs={this.props.staffs.staffs} salaryLoading={this.props.salaries.isLoading} salaryErrMess={this.props.salaries.errMess} />} />
              <Route path ='/salary/:staffId/:month' component={SalaryWithStaffId}/>
              <Route path='/staffs/:staffId' component={StaffWithId} />
              <Route exact path='/department' component={() => <DepartmentList deleteDepartment={this.props.deleteDepartment} createDepartment={this.props.createDepartment} staffs={this.props.staffs} departmentsLoading={this.props.departments.isLoading} departmentsErrMess={this.props.departments.errMess} departments={this.props.departments.departments} />} />
              <Route path='/department/:departmentId' component={DepartmentWithId} />
              <Redirect to='/staffs' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
