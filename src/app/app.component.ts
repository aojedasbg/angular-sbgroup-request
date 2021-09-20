import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sbgroup-landing';

  constructor( 
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log( ( this.actRoute.snapshot ) )
    // console.log( this.actRoute );
    // console.log( window.location.href );
    // let route = window.location.href.split("/")[3]
    // console.log( route.split(".")[0] );
  }

  ngAfterViewInit() {
    // console.log( this.actRoute.snapshot.fragment );
  }

}
