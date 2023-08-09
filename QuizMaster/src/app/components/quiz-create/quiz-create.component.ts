import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  templateUrl: './quiz-create.component.html',
  styleUrls: ['./quiz-create.component.css']
})
export class QuizCreateComponent implements OnInit {
  submitted = false;
  quizForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  ngOnInit() {}
  mainForm() {
    this.quizForm = this.fb.group({
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
    return this.quizForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.quizForm.valid) {
      return false;
    } else {
      return this.apiService.createQuiz(this.quizForm.value).subscribe({
        complete: () => {
          console.log('Quiz successfully created!'),
            this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
}

