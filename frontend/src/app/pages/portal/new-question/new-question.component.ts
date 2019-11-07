import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  public newQuestionForm = new FormGroup({
    vendor: new FormControl(''),
    model: new FormControl(''),
    number: new FormControl(''),
    milage: new FormControl('')
  });

  editId: string;

  error: string;
  loading: boolean;
  arrayItems = ['asdas', 'ads', 'asd'];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onSubmit() {
    this.loading = true;
    const question = {
      title: this.newQuestionForm.controls['title'].value,
      description: this.newQuestionForm.controls['description'].value,
      tag: this.newQuestionForm.controls['tag'].value
    };
  }

  addTag() {
    var newTag = this.newQuestionForm.controls['tag'].value;
    this.arrayItems.push(newTag);
  }
}
