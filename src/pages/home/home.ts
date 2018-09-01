import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    public API = 'http://vincesima.com/books/JurassicPark.txt'
    public words : String[];
    public beforeWord: String;
    public word: String;
    public afterWord: String;
    public wordCount: number;
    public wpm: number;
    public speed: number;
    public running: any
    public switch: boolean;
    public buttonContent: String;



  constructor(public navCtrl: NavController, public http: Http) {
    this.speed = 200;
    this.wpm = 300;
    this.wordCount = 0;
    this.loadBook();
    this.switch = false;
    this.buttonContent = "START"
  }

  toggle(){
    if(this.switch === false){
      this.run();
      this.switch = true;
      this.buttonContent = "STOP"
    } else {
      this.stop();
      this.switch = false;
      this.buttonContent = "START"
    }
  }


  run(){
     this.running = setInterval(() => {  
        this.changeWords();
        console.log(this.wordCount);
        }, this.speed);
      }

  stop(){
    clearInterval(this.running);

  }

  speedup(){
    if(this.switch){
    this.stop();
    this.wpm += 60;
    this.speed = (1000/(this.wpm/60));
    this.run();
  }
  }

  speeddown(){
    if(this.switch){
      this.stop();
      this.wpm -= 60;
      this.speed = (1000/(this.wpm/60));
      this.run();
    }
  }
  

  changeWords(){
    this.wordCount++;
    this.setWords(this.wordCount)

  }

  async setWords(starting){
    if(starting == 0){
      this.beforeWord = "";
      this.word = this.words[0];
      this.afterWord = this.words[1];
    } else {
      this.beforeWord = this.words[starting-1]
      this.word = this.words[starting];
      this.afterWord = this.words[starting + 1];
    }
  }


  async loadBook(){
    var book: String;
    const response = await this.getBook().toPromise();
    book = response.text();
    this.words = book.replace( /\n/g, " " ).split(" ");
    this.setWords(this.wordCount);
  }

  getBook(): Observable<any>{
    return this.http.get(this.API);
  }



}
