import { Component, OnInit } from '@angular/core';
import {ProjectServices} from "../services/project.services";
import {IProj} from "../models/proj.model";
import {PageInfo} from "../models/pageInfo.model";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  projects: IProj[] = []
  loading = false
  error = false
  searchName = ''
  start_page = 1
  pageInfo: PageInfo = new PageInfo(this.start_page, 0, 0)

  constructor(private projectService: ProjectServices) {
  }

  ngOnInit(): void {
    this.loadProjects(this.start_page)
  }

  loadProjects(page: number) {
    this.loading = true
    this.error = false
    this.projectService.getAll(page, this.searchName).subscribe(projects => {
      this.projects = projects.data
      this.loading = false
      this.pageInfo = projects.pageInfo
    },
      error => {
        this.error = true
        this.loading = false
      })
  }

  gty(page: any){
    this.loadProjects(page)
  }

  getSearchProjects() {
    this.pageInfo.currentPage = this.start_page
    this.loadProjects(this.pageInfo.currentPage)
  }
}
