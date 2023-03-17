import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageConstants } from '../../constants/message-constant';
import { AuthService } from '../../services/auth/auth.service';
import { CommonService } from '../../services/common/common.service';
import { StorageKey, StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: any = FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    private storageService: StorageService,
    private spinner: NgxSpinnerService) { }


  ngOnInit(): void {
    this.initLoginForm();
  }
  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', [Validators.required]], // TODO: set default cred, remove once tested
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (!this.loginForm.value.emailAddress || !this.loginForm.value.password) {
      this.commonService.openSnackBar(MessageConstants.ENTER_LOGIN_INFO);
      return;
    }

    this.spinner.show();
    let objData = {
      EmailId: this.loginForm.value.emailAddress,
      Password: this.loginForm.value.password
    };

    this.authService.login(objData).pipe().subscribe(
      response => {
        this.spinner.hide();
        if (response.success && response.data && response.data.accessToken) {
          this.storageService.setValue(StorageKey.authToken, response.data.accessToken.token);
          this.storageService.setValue(StorageKey.fullName, response.data.fullName);
          this.router.navigate(['dashboard']);
        } 
        else {
          this.commonService.openSnackBar(MessageConstants.INVALID_LOGIN_CREDENTIAL);
        }
      },
      error => {
        this.spinner.hide();
        this.commonService.openSnackBar(MessageConstants.SOMETHING_WENT_WRONG);
      });
     
  }
   
}
