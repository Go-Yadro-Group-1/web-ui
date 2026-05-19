import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {IRequest} from "../models/request.model";
import {ConfigurationService} from "./configuration.services";

@Injectable({
    providedIn: 'root'
})
export class ProjectServices {
  urlPath = ""

  constructor(private http: HttpClient, private configurationService: ConfigurationService) {
    this.urlPath = configurationService.getValue("pathUrl")
  }

  private get apiUrl(): string {
    return this.urlPath.startsWith("http") ? this.urlPath : `http://${this.urlPath}`
  }

  getAll(page: number, searchName: String): Observable<IRequest>{
    const params = new HttpParams()
      .set("limit", "10")
      .set("page", page)
      .set("search", searchName.toString())

    return this.http.get<IRequest>(`${this.apiUrl}/api/v1/connector/projects`, { params })
  }

  addProject(key: String): Observable<IRequest>{
    const params = new HttpParams().set("project", key.toString())

    return this.http.post<IRequest>(`${this.apiUrl}/api/v1/connector/updateProject`, null, { params })
  }

  deleteProject(id: Number): Observable<IRequest> {
    return this.http.delete<IRequest>(`${this.apiUrl}/api/v1/projects/${id}`)
  }
}
