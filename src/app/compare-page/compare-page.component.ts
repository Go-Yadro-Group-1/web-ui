import { Component, OnInit } from '@angular/core';
import {IProj} from "../models/proj.model";
import {DatabaseProjectServices} from "../services/database-project.services"
import { Router } from '@angular/router';
import {CheckedProject} from "../models/check-element.model";
import {ConfigurationService} from "../services/configuration.services";


@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.css']
})
export class ComparePageComponent implements OnInit {
  projects: IProj[] = []
  selectedProjects: any[] = []
  checked: Map<any, any> = new Map();
  loading = false
  error = false
  noProjects: boolean = false
  inited: boolean = false

  webUrl = ""
  constructor(private configurationService: ConfigurationService, private myProjectService: DatabaseProjectServices, private router: Router) {
    this.webUrl = configurationService.getValue("webUrl")
  }


  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects() {
    this.loading = true
    this.error = false
    this.myProjectService.getAll().subscribe(projects => {
      this.noProjects = projects.data.length == 0;
      console.log(projects)
      this.projects = projects.data
      this.selectedProjects = []
      this.checked.clear()
      this.loading = false
      this.inited = true
    },
      error => {
        this.error = true
        this.loading = false
        this.inited = true
      })
  }

  onProjectToggle(project: any, checked: boolean) {
    if (checked) {
      if (!this.selectedProjects.includes(project)) {
        this.selectedProjects.push(project);
      }
      this.checked.set(project.Name, project.Id)
    } else {
      this.selectedProjects = this.selectedProjects.filter(p => p !== project);
      if (this.checked.has(project.Name)){
        this.checked.delete(project.Name)
      }
    }
  }

  compare() {
    console.log('Compare:', this.selectedProjects);
    this.onClickCompare()
  }

  onClickCompare(): void {
    let items:  string[] = []
    let ids:  number[] = []
    this.checked.forEach((value: number, key: string) =>{
      if (value){
        items.push(key)
        ids.push(value)
      }
    })

    if (items.length > 3){
      this.showErrorMessage("Максимальное число проектов 3")
    }else if (items.length <= 1){
      this.showErrorMessage("Минимальное число проектов для сравнения 2.")
    }else{
      this.router.navigate([`/compare-projects`], {
        queryParams: {
          keys: items,
          value: ids
        }
      });
    }

  }

  childOnChecked(project: CheckedProject){
    if (project.Checked) {
      this.checked.set(project.Name, project.Id)
    }else if (this.checked.has(project.Name)){
      this.checked.delete(project.Name)
    }
  }

  showErrorMessage(msg: string){
    alert(msg)
  }

}
