import React, { Component } from 'react';
import StaffList from './StaffListComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Salary from './SalaryComponent';
import DepartmentList from './DepartmentListComponent';
import DepartmentDetail from './DepartmentDetail';
import StaffDetail from "./StaffDetailComponent";

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postStaff, fetchStaffs, fetchDepartments, fetchStaffsSalary, deleteStaff, updateStaff } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,
    staffsSalary: state.staffsSalary
  }
}

const mapDispatchToProps = dispatch => ({
  postStaff: (staff) => dispatch(postStaff(staff)),
  fetchStaffs: () => { dispatch(fetchStaffs()) },
  fetchDepartments: () => { dispatch(fetchDepartments()) },
  fetchStaffsSalary: () => { dispatch(fetchStaffsSalary()) },
  deleteStaff: (staffId) => dispatch(deleteStaff(staffId)),
  updateStaff: (staff) => dispatch(updateStaff(staff))
})

class Main extends Component {

  componentDidMount() {
    this.props.fetchStaffs();
    this.props.fetchDepartments();
    this.props.fetchStaffsSalary();
  }

  render() {
    const StaffWithId = ({ match }) => {

      return (
        <StaffDetail
          staff={this.props.staffs.staffs.find((staff) => staff.id === parseInt(match.params.staffId))}
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
      console.log(match.params.departmentId)
      return (
        <DepartmentDetail
          staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departmentId)}
          staffsLoading={this.props.staffs.isLoading}
          staffsErrMess={this.props.staffs.errMess}
          department={this.props.departments.departments.find((department) => department.id === match.params.departmentId)}
          departmentsLoading={this.props.departments.isLoading}
          departmentsErrMess={this.props.departments.errMess}
        />
      );
    }

    return (
      <div>

        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames='page' timeout={500}>
            <Switch location={this.props.location}>
              <Route exact path='/staff' component={() => <StaffList postStaff={this.props.postStaff} staffsLoading={this.props.staffs.isLoading} staffsErrMess={this.props.staffs.errMess} />} />
              <Route path='/salary' component={() => <Salary staffsSalary={this.props.staffsSalary.staffsSalary} salaryLoading={this.props.staffsSalary.isLoading} salaryErrMess={this.props.staffsSalary.errMess} />} />
              <Route path='/staff/:staffId' component={StaffWithId} />
              <Route exact path='/department' component={() => <DepartmentList departmentsLoading={this.props.departments.isLoading} departmentsErrMess={this.props.departments.errMess} departments={this.props.departments.departments} />} />
              <Route path='/department/:departmentId' component={DepartmentWithId} />
              <Redirect to='/staff' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
