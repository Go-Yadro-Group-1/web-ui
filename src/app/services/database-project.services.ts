import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRequest} from "../models/request.model";
import {IRequestObject} from "../models/requestObj.model";
import {ConfigurationService} from "./configuration.services";

@Injectable({
  providedIn: 'root'
})
export class DatabaseProjectServices {
  urlPath = ""

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.urlPath = configurationService.getValue("pathUrl")
  }

  private get apiUrl(): string {
    return this.urlPath.startsWith("http") ? this.urlPath : `http://${this.urlPath}`
  }

  getAll(): Observable<IRequest>{
    return this.http.get<IRequest>(`${this.apiUrl}/api/v1/projects`)
  }

  getProjectStatByID(id: string): Observable<IRequestObject> {
    return this.http.get<IRequestObject>(`${this.apiUrl}/api/v1/projects/${id}`)
  }

  getComplitedGraph(taskNumber: string, projectName: Array<string>): Observable<IRequestObject> {
    const params = new HttpParams().set("project", projectName.join(","))

    return this.http.get<IRequestObject>(`${this.apiUrl}/api/v1/compare/${taskNumber}`, { params })
  }

  getGraph(taskNumber: string, projectName: string): Observable<IRequestObject> {
    const params = new HttpParams().set("project", projectName)

    return this.http.get<IRequestObject>(`${this.apiUrl}/api/v1/graph/get/${taskNumber}`, { params })
  }

  makeGraph(taskNumber: string, projectName: string): Observable<IRequestObject> {
    const params = new HttpParams().set("project", projectName)

    return this.http.post<IRequestObject>(`${this.apiUrl}/api/v1/graph/make/${taskNumber}`, null, { params })
  }

  deleteGraphs(projectName: string): Observable<IRequestObject> {
    const params = new HttpParams().set("project", projectName)

    return this.http.delete<IRequestObject>(`${this.apiUrl}/api/v1/graph/delete`, { params })
  }

  isAnalyzed(projectName: string): Observable<IRequestObject>{
    const params = new HttpParams().set("project", projectName)

    return this.http.get<IRequestObject>(`${this.apiUrl}/api/v1/isAnalyzed`, { params })
  }

  isEmpty(projectName: string): Observable<IRequestObject>{
    const params = new HttpParams().set("project", projectName)

    return this.http.get<IRequestObject>(`${this.apiUrl}/api/v1/isEmpty`, { params })
  }
}
