import {Component} from "@angular/core";
import {OnInit} from "@angular/core";
import {ApiCall} from "../../services/api-call";

@Component({
  templateUrl: './app/about/components/about.html'
})
export class AboutComponent implements OnInit {
  constructor(private apiCall: ApiCall) {

  }
  ngOnInit() {

  }
}
