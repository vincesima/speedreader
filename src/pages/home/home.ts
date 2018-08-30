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
    public running: boolean;
    public inputSpeed: number;
    public timer: number;
    public wpm: number;

  constructor(public navCtrl: NavController, public http: Http) {
    this.wordCount = 0;
    this.running = false;
    this.inputSpeed = 100;


    this.loadBook();
  }

  ngOnInit(){
    setInterval(() => {      
      this.calcSpeed(this.inputSpeed)
    },50);
    setInterval(() => {      
      this.run()
    },this.timer);
  }

  calcSpeed(input){
      return (1 - (.1*input))
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

  runningToggle(){
    if(this.running === true){
      this.running = false;
    } else this.running = true;

  }

  run(){
    if(this.running === true){
      this.changeWords();
  }
}

  changeWords(){
    this.wordCount++;
    this.setWords(this.wordCount)
    console.log(this.speed)
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
