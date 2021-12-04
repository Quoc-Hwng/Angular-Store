import { Router,ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(private _router: Router,private route:ActivatedRoute) { }
  navigatoFoo(rou: string){
    this._router.navigate(["/"+rou], {
      relativeTo: this.route,
      queryParams: {
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }
  ngOnInit(): void {
  }

}
