import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "./database.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //title = 'movieAng';
  actorsDB: any[] = [];
  section = 1;
  fullName: string = "";
  bYear: number = 0;
  actorId: string = "";
  moviesDB: any[] = [];
  title: string = "";
  aYear: number = 0;
  movieId: string = "";
  
  constructor(private dbService: DatabaseService) {}

  //Get all Actors
  onGetActors() {
    this.dbService.getActors().subscribe((data: any[]) => {
      this.actorsDB = data;
    });
  }
  //Create a new Actor, POST request
  onSaveActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.createActor(obj).subscribe(result => {
      this.onGetActors();
    });
  }
  // Update an Actor
  onSelectUpdate(item) {
    this.fullName = item.name;
    this.bYear = item.bYear;
    this.actorId = item._id;
  }
  onUpdateActor() {
    let obj = { name: this.fullName, bYear: this.bYear };
    this.dbService.updateActor(this.actorId, obj).subscribe(result => {
      this.onGetActors();
    });
  }

  //Delete Actor
  onDeleteActor(item) {
    this.dbService.deleteActor(item._id).subscribe(result => {
      this.onGetActors();
    });
  }

  //Get all Movies
  onGetMovies() {
    this.dbService.getMovies().subscribe((data: any[]) => {
      this.moviesDB = data;
    });
  }
  //Create a new Movie, POST request
  onSaveMovie() {
    let obj = { title: this.title, year: this.aYear };
    this.dbService.createMovie(obj).subscribe(result => {
      this.onGetMovies();
    });
  }
  // Update an Actor
  onSelectUpdateM(item) {
    this.title = item.title;
    this.aYear = item.aYear;
    this.movieId = item._id;
  }
  onUpdateMovie() {
    let obj = { title: this.title, year: this.aYear };
    this.dbService.updateMovie(this.movieId, obj).subscribe(result => {
      this.onGetMovies();
    });
  }

  //Delete Actor
  onDeleteMovie(item) {
    this.dbService.deleteMovie(item._id).subscribe(result => {
      this.onGetMovies();
    });
  }

  onDeleteBeforeYear() {
    for (let index = 0; index < this.moviesDB.length; index++) {
      let date = this.moviesDB[index].year;
      if (this.aYear > date) {
        this.dbService.deleteYear(this.moviesDB[index]._id).subscribe(result => {
          this.onGetMovies();
        });
      }
    }
  }

  // This lifecycle callback function will be invoked with the component get initialized by Angular.
  ngOnInit() {
    this.onGetActors();
    this.onGetMovies();
  }

  changeSection(sectionId) {
    this.section = sectionId;
    this.resetValues();
  }

  resetValues() {
    this.fullName = "";
    this.bYear = 0;
    this.actorId = "";
    this.title = "";
    this.aYear = 0;
    this.movieId = "";
  }
}