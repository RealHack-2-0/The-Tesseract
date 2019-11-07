import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.scss']
})
export class ViewQuestionsComponent implements OnInit {
  questions = [
    {
      owner: 'Kasun Perera',
      title: 'How to build a NodeJS app?',
      content: 'How can I build a new NodeJS appliation from scratch'
    },
    {
      owner: 'Kasun Perera',
      title: 'How to build a NodeJS app?',
      content: 'How can I build a new NodeJS appliation from scratch'
    },
    {
      owner: 'Kasun Perera',
      title: 'How to build a NodeJS app?',
      content: 'How can I build a new NodeJS appliation from scratch'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
