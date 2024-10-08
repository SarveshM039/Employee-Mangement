import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../../model/class/Employee';
import { MasterService } from '../../service/master.service';
import { AsyncPipe } from '@angular/common';
import { IProject } from '../../model/interface/master';


@Component({
  selector: 'app-project-from',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,AsyncPipe],
  templateUrl: './project-from.component.html',
  styleUrl: './project-from.component.css'
})
export class ProjectFromComponent {
  projectForm : FormGroup = new FormGroup({});

  emplList$: Observable<Employee[]> = new Observable<[]>;
  masterSrv= inject(MasterService);
  activateRoute= inject(ActivatedRoute);

  ngOnInit() {
    this.initializeForm();  // Call the form initialization
  }
  
  constructor() {
    this.emplList$ =  this.masterSrv.getAllEmp();
    this.initializeForm();
    this.activateRoute.params.subscribe((res:any)=>{
      if(res.id != 0) {
        this.getPRoject(res.id)
      }
    })
  }

  initializeForm(data?:IProject) {
    this.projectForm = new FormGroup({
      projectId:  new FormControl(data ? data.projectId: 0),
      projectName: new FormControl(data ? data.projectName: ''),
      clientName: new FormControl(data ? data.clientName: ''),
      startDate: new FormControl(data ? data.startDate: ''),
      leadByEmpId: new FormControl(data ? data.leadByEmpId: ''),
      contactPerson: new FormControl(data ? data.contactPerson: ''),
      contactNo: new FormControl(data ? data.contactNo: ''),
      emailId: new FormControl(data ? data.emailId: '')
    })
  }

  getPRoject(id: number) { 
    this.masterSrv.getProjectById(id).subscribe((res:IProject)=>{
      this.initializeForm(res) 
    },error=>{
      alert('API Error')
    })
  }


  onSaveProject() {
    const formVlaue = this.projectForm.value;
    this.masterSrv.saveProject(formVlaue).subscribe((res:IProject)=>{
      alert("Project Created") 
     this.projectForm.reset();
    },error=>{
      alert('API Error')
    })
  }

  onUpdate() {
    const formVlaue = this.projectForm.value;
    this.masterSrv.updateProject(formVlaue).subscribe((res:IProject)=>{
      alert("Project Update") 
     this.projectForm.reset();
    },error=>{
      alert('API Error')
    })
  }


 

}
