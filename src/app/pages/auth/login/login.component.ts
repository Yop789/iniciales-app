import { AuthService } from './../services/auth.service';
import { BaseForm } from './../../../shared/utils/base-form';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private router: Router,
    private authSvc: AuthService
  ) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  onLogin(){
    if (this. loginForm.invalid) return;

    const data = this. loginForm. value;

    this.authSvc. login(data).subscribe( (result) => {});
  }
}
