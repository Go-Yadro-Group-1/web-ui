import { Component, OnInit } from '@angular/core';
import {DatabaseProjectServices} from "../services/database-project.services";
import {IProj} from "../models/proj.model";
import {CheckedProject} from "../models/check-element.model";

@Component({
  selector: 'app-my-project-page',
  templateUrl: './my-project-page.component.html',
  styleUrls: ['./my-project-page.component.css']
})
export class MyProjectPageComponent implements OnInit {
  projects: IProj[] = []
  myProjects: IProj[] = []
  checked: Map<any, any> = new Map();
  loading = false
  error = false
  noProjects: boolean = false
  inited: boolean = false

  constructor(private myProjectService: DatabaseProjectServices) { }

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects() {
    this.loading = true
    this.error = false
    this.myProjectService.getAll().subscribe(projects => {
      this.noProjects = projects.data.length == 0;
      this.projects = projects.data
      this.myProjects = this.projects
      this.loading = false
      this.inited = true
    }, error => {
      this.error = true
      this.loading = false
      this.inited = true
    })
  }

  childOnChecked(project: CheckedProject){
    if (project.Checked) {
      this.checked.set(project.Name, project.Id)
    }else if (this.checked.has(project.Name)){
      this.checked.delete(project.Name)
    }
  }

}
