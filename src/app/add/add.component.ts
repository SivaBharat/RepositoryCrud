import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { EmployeeService } from 'src/service/employee.service'; 

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {  
  employeeForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {   
    this.employeeForm = this.fb.group({
      EmpName: ['', Validators.required], 
      EmpDepartment: ['', Validators.required] 
    });
  }

  
  onSubmit() {
    if (this.employeeForm.valid) {     
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        response => {   
          alert('Employee added successfully!');       
          console.log('Employee added successfully', response);         
          this.employeeForm.reset();
        },
        error => {    
          alert('Error occured during add employee');     
          console.error('Error adding employee', error);
        }
      );
    }
  }
}
