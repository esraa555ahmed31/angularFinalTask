import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  firstReactiveForm :FormGroup;

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.firstReactiveForm=this.fb.group({
      address:['',Validators.required],
      phone:['',Validators.required],
      email:['',Validators.required],
      

    })
    
  }
  get registerFormControl() {
    // console.log( this.firstReactiveForm.controls)
    return this.firstReactiveForm.controls;
  }

  handleReactiveFormSubmit(){
    console.log(this.firstReactiveForm.value);
    const address = this.firstReactiveForm.get('address').value;
 const phone = this.firstReactiveForm.get('phone').value;
 const email = this.firstReactiveForm.get('email').value;

 this.router.navigate(['/userInfo' , address, phone, email]);
  }

}
