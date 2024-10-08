import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IApiResponse, IChildDepart, IParentDepart } from '../../model/interface/master';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../model/class/Employee';
import { error, log } from 'console';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  isFormVisiable = signal<boolean>(false);
  mastersrv=inject(MasterService);
  parentDeptList =signal<IParentDepart[]>([]);
  employeeList =signal<Employee[]>([]);
  childDeptList =signal<IChildDepart[]>([]);
  parentDeptId:number =0;
  // employeeobj:Employee = new Employee();
      
  employeeobj: Employee = {
    employeeId: 0,   // or leave null if your API allows it
    employeeName: '',
    contactNo: '',
    emailId: '',
    deptId: 0,
    password: '',
    gender: '',
    role: '',
  };
  

  ngOnInit(): void {
    this.getParentDept();
    this.getEmployee();
  }

  getParentDept(){
    return this.mastersrv.getAllDept().subscribe((res:IApiResponse)=>{
       this.parentDeptList.set(res.data);
    })
  }
  
  getEmployee(){
    return this.mastersrv.getAllEmp().subscribe((res:Employee[])=>{      
       this.employeeList.set(res);
    })
  }

  onParentDeptChange(){
  return this.mastersrv.getChildDeptById(this.parentDeptId).subscribe((Res:IApiResponse)=>{  
   this.childDeptList.set(Res.data);
   })
  }


  onSave(){
    this.mastersrv.saveEmp(this.employeeobj).subscribe((res:IApiResponse)=>{
   alert("Employee created")
   this.employeeobj=new Employee();
    },error=>{
      alert("Error");
    })
  }

  OnEdit(data:Employee){
    this.employeeobj=data;
    this.isFormVisiable.set(true)
    this.getEmployee();
  }

  OnDelete(id:any){
 const isDelete = confirm("Are you sure want to delete");
  if(isDelete){
    this.mastersrv.deleteEmp(id).subscribe((res:IApiResponse)=>{
      alert("Employee Deleted")
      this.getEmployee();
       },error=>{
         alert("Error");
       })
  }
  }

  onUpdate(){
    this.mastersrv.updateEmp(this.employeeobj).subscribe((res:IApiResponse)=>{
      alert("Employee Updated")
      this.getEmployee();
      this.employeeobj=new Employee();
       },error=>{
         alert("Error");
       })
  }
}
