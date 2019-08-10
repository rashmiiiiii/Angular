
import { Injectable } from '@angular/core';
import { DataFeederService } from './shared/datafeeder.service' 
import { Faculty } from './shared/faculty.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  f_list:Faculty[]=[]
  constructor(private dfs:DataFeederService) {
    this.f_list = dfs.getFaculties()
   }
   getSearchResult(str):Faculty[]
   {
     let search_list:Faculty[] =[];
     for (let i = 0;i<this.f_list.length;i++)
     {
       let f =this.f_list[i];
       if(f.ename.includes(str))
       {
         search_list.push(f);
       }
     }
     console.log("search result list:",search_list)
     return search_list;
   }
   getFacultyCountByDept()
   {
     let data =[]
     data.push(["Dname","Count"])
     let res = {}
     for(let i=0;i<this.f_list.length;i++)
     {
       let f = this.f_list[i]
       if (f.dname in res)
       {
         res[f.dname] += 1
       }
       else
       {
         res[f.dname] = 1
       }
     }
     for(let [key,value] of Object.entries(res))
     {
       data.push([key,value])
     }
     return data     
   }
   getFacultyByDname(dname:string):Faculty[]
   {
     let f_lst:Faculty[]=[];
     for(let f of this.f_list)
     {
       if(f.dname == dname)
       {
         f_lst.push(f);
       }
     }
     return f_lst;
   
   }
   addFaculty(faculty: Faculty) {
    this.f_list.push(faculty)
  }
   }

