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
    public inputSpeed: number;
    public running: any;

  constructor(public navCtrl: NavController, public http: Http) {
    this.inputSpeed = 600;
    this.wordCount = 0;
    this.loadBook();
  }

  run(speed){
     this.running = setInterval(() => {  
        this.changeWords();
        console.log(this.wordCount);
        }, speed);
      }

  stop(){
    clearInterval(this.running)
  }

  start(){
    this.run(this.calcSpeed(this.inputSpeed));
  }

  changeSpeed(){
    this.stop();
    this.start();
  }

  calcSpeed(input){
      return Math.round(((1-(input/60))+20)*50);
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
