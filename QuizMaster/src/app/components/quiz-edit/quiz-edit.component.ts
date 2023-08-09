import { Quiz } from './../../model/quiz';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrls: ['./quiz-edit.component.css']
})
export class QuizEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  quizData: Quiz[];
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.updateQuiz();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getQuiz(id);
    this.editForm = this.fb.group({
      category: ['', [Validators.required]],
      question: ['', [Validators.required]],
      questionNo: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]]
    });
  }
    
  get myForm() {
    return this.editForm.controls;
  }
  getQuiz(id) {
    this.apiService.getQuiz(id).subscribe((data) => {
      this.editForm.setValue({
        category: data.data['category'],
        question: data.data['question'],
        questionNo: data.data['questionNo'],
        answerA: data.data['answerA'],
        answerB: data.data['answerB'],
        answerC: data.data['answerC'],
        answerD: data.data['answerD'],
        correctAnswer: data.dat['correctAnswer']
      });
    });
  }
  updateQuiz() {
    this.editForm = this.fb.group({
      category: ['', [Validators.required]],
      question: ['', [Validators.required]],
      questionNo: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
       if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
         this.apiService.updateQuiz(id, this.editForm.value).subscribe({
          complete: () => {
            this.router.navigateByUrl('/admin');
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }
}

