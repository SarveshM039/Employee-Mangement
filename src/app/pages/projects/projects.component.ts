import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProject } from '../../model/interface/master';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit{

  projectList: IProject[]=[];
  masterSrv = inject(MasterService);
  router = inject(Router);

  ngOnInit(): void {
    this.getProjectss();
  }

  getProjectss(){
    this.masterSrv.getAllProjects().subscribe((Res:IProject[])=>{
      this.projectList =Res;
    })
  }

  onEdit(id:number){
   this.router.navigate(['new-project',id])
  }


  onDelete(id:any){
    const isDelete = confirm("Are you sure want to delete");
     if(isDelete){
       this.masterSrv.deleteProject(id).subscribe((res:IProject)=>{
         alert("Project Deleted")
         this.getProjectss();
          },error=>{
            alert("Error");
          })
     }
     }

}


