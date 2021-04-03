import { Component,OnDestroy } from '@angular/core';
import * as $ from 'jquery'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService} from '../services/global.service'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
@Pipe({
  name: 'safe'
})
export class Tab3Page implements OnDestroy {
  play:any
  html:any
  src:any="https://www.youtube.com/embed/D-6yRDMxDMc"
  constructor(public global: GlobalService,private sanitizer: DomSanitizer) {

    this.html = " <iframe id='youtube_player' class='yt_player_iframe'  style='height: 100vh;width: 100%;' src='https://www.youtube.com/embed/D-6yRDMxDMc' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
    this.src ="https://www.youtube.com/embed/D-6yRDMxDMc"

    this.play = false
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  ionViewWillEnter() { 
    this.play = true
    this.global.playvideo = true
    
     
  }
 

  ionViewDidLeave() {
    
     
    this.global.playvideo = false
    }
    ngOnDestroy(){
   
    }

}
