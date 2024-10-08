import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponse, IProject, IProjectEmployee } from '../model/interface/master';
import { Employee } from '../model/class/Employee';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  
  apiUser: string ='https://projectapi.gerasim.in/api/EmployeeManagement/';

  constructor(private http:HttpClient) { }

  getAllDept():Observable<IApiResponse>{
    return this.http.get<IApiResponse>(this.apiUser+"GetParentDepartment");
  }

  getChildDeptById(deptid:number):Observable<IApiResponse>{
    return this.http.get<IApiResponse>(`${this.apiUser}GetChildDepartmentByParentId?deptId=${deptid}`);
  }

  saveEmp(obj:Employee):Observable<IApiResponse>{
    return this.http.post<IApiResponse>(this.apiUser+"CreateEmployee",obj);
  }

  getAllEmp():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.apiUser+"GetAllEmployees");
  }
  
  updateEmp(obj:Employee):Observable<IApiResponse>{
    return this.http.put<IApiResponse>(this.apiUser+"UpdateEmployee/"+obj.employeeId,obj);
  }

  deleteEmp(id:any):Observable<IApiResponse>{
    return this.http.delete<IApiResponse>(this.apiUser+"DeleteEmployee/"+id);
  }

  saveProject(obj: Employee): Observable<IProject> {
    return this.http.post<IProject>(this.apiUser + "CreateProject", obj);
  }

  getAllProjects():Observable<IProject[]>{
    return this.http.get<IProject[]>(this.apiUser+"GetAllProjects");
  }

  getProjectById(id:number):Observable<IProject>{
    return this.http.get<IProject>(this.apiUser+"/GetProject/"+id);
  }

  updateProject(obj:IProject):Observable<IProject>{
    return this.http.put<IProject>(this.apiUser+"UpdateProject/"+obj.projectId,obj);
  }

  deleteProject(id:any):Observable<IProject>{
    return this.http.delete<IProject>(this.apiUser+"DeleteProject/"+id);
  }

  getProjectEmp(): Observable<IProjectEmployee[]> {
    return this.http.get<IProjectEmployee[]>(this.apiUser + "GetAllProjectEmployees");
  }
 
  saveProjectEmp(obj: IProjectEmployee): Observable<IProject> {
    return this.http.post<IProject>(this.apiUser + "CreateProjectEmployee", obj);
  } 
  updateProjectEmp(obj: IProjectEmployee): Observable<IProjectEmployee> {
    return this.http.put<IProjectEmployee>(this.apiUser + "UpdateProjectEmployee/"+obj.empProjectId, obj);
  }

  deleteProjectEmp(id:any):Observable<IProject>{
    return this.http.delete<IProject>(this.apiUser+"DeleteProjectEmployee/"+id);
  }
  
  getDashbvaordData(): Observable<any> {
    return this.http.get<any>(this.apiUser + "GetDashboard");
  }
}
