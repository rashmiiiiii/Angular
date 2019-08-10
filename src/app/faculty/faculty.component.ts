import { AppService } from './../app.service';
import { Faculty } from './../shared/faculty.model';
import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { ChartSelectEvent } from 'ng2-google-charts';
import { FormBuilder,Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  searchStr:string
  searchFaculty:Faculty[]=[]
  flag =false
  f_dname_list :Faculty[]=[]
  f_form:FormGroup;
  constructor(private appservice: AppService,private fb:FormBuilder) {

  }

  ngOnInit() {
    this.f_form=this.fb.group({
        empno:['',Validators.required],
        ename:['',Validators.required],
        qualification:['',Validators.required],
        dname:['',Validators.required]
    })
  }
  getSearchResult()
  {
    this.searchStr = this.searchStr.trim()
    if(this.searchStr.length > 0)
    {
      this.flag= true;
      this.searchFaculty= this.appservice.getSearchResult(this.searchStr);
    }

  }
  public pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    dataTable:this.appservice.getFacultyCountByDept(),
    //opt_firstRowIsData: true,
    options: {'title': 'EMPLOYEE COUNT BY DEPARTMENT',
    'height':200,
    'width':200
  },
  };
  getFacultyByDname(event:ChartSelectEvent)
  {
    
    let dname =event.selectedRowValues[0]
    this.f_dname_list=this.appservice.getFacultyByDname(dname)
  }
  submitForm()
  {
    let faculty:Faculty=this.f_form.value;
    this.appservice.addFaculty(faculty)
    this.f_form.reset()
  }
  get empno()
  {
    return this.f_form.get('empno')
  }
  get ename()
  {
    return this.f_form.get('ename')
  }
  get qualification()
  {
    return this.f_form.get('qualification')
  }
  get dname()
  {
    return this.f_form.get('dname')
  }


}
  


