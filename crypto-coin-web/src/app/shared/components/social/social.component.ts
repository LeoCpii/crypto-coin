import { Component, Input } from '@angular/core';

type IValiSocial = 'reddit' | 'facebook' | 'twitter' | 'github';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  @Input() social: IValiSocial; 

  constructor() { }
}
