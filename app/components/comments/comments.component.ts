import {Component, OnInit, Input} from "@angular/core";
import {CommentsProxy} from "../../services/proxy/comments-proxy.service";
import {Comment} from "../../models/comment";
import {UserManager} from "../../user-manager.service";

@Component({
  moduleId: module.id,
  selector: 'comments',
  templateUrl: 'comments.component.html',
  styleUrls: ['comments.component.css'],
  providers: [CommentsProxy]
})
export class CommentsComponent implements OnInit {
  @Input() resourceId: number;
  @Input() resourceName: string;
  comments: Comment[];
  userId: string;

  constructor(private commentsProxy: CommentsProxy, private userManager: UserManager) {
    this.userId = this.userManager.getUserId();
  }

  ngOnInit() {
    this.commentsProxy.getComments(this.resourceName, this.resourceId, {include: 'owner,owner.user-images,owner.company,owner.company.company-images'}).then(result => {
      this.comments = result.data;
    });
  }

}
