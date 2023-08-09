import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  Quiz: any = [];
  constructor(private apiService: ApiService) { 
    this.readQuiz();
  }
  ngOnInit() {}
  readQuiz(){
    this.apiService.getQuizzes().subscribe((data) => {
     this.Quiz = data;
    })    
  }
  removeQuiz(quiz, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteQuiz(quiz._id).subscribe((data) => {
          this.Quiz.splice(index, 1);
        }
      )    
    }
  }
}

