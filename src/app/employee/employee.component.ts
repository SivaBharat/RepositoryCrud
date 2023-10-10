import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/service/employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  title = 'CrudApi';
  employees: any[] = [];
  editedRecord: any = null;

  constructor(private employeeService: EmployeeService,private http: HttpClient) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  editRecord(record: any) {
    this.editedRecord = { ...record }; 
  }

  updateRecord() {
    if (this.editedRecord) {
      const empId = this.editedRecord.empId;
      this.http.put(`https://localhost:44386/api/Employees/${empId}`, this.editedRecord)
        .subscribe(() => {          
          const index = this.employees.findIndex((r) => r.empId === empId);
          if (index !== -1) {
            this.employees[index] = this.editedRecord;
          } 
          alert('Updated successfully');         
          this.editedRecord = null;
        });
    }
  }

  confirmDelete(employee: any) {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this.deleteEmployee(employee);
    }
  }

  deleteEmployee(employee: any) {   
    this.employeeService.deleteEmployee(employee.empId).subscribe(
      () => {
        alert('Employee deleted successfully');
        this.getEmployees();
      },
      (error) => {
        alert('Error deleting employee');
        console.error('Error deleting employee', error);
      }
    );
  }
}
