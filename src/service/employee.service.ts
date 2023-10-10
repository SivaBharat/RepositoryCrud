import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/Models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://localhost:44386/api/Employees';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  // Method to add an employee
  addEmployee(employeeData: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData);
  }

getEmployeeById(id: number): Observable<Employee> {
  return this.http.get<Employee>(`${this.apiUrl}/${id}`);
}

updateEmployee(id: number, employeeData: Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.apiUrl}/${id}`, employeeData);
}
deleteEmployee(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
