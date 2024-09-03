
import { Component } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import{ FormGroup,FormBuilder,ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NzCheckboxModule, 
    NzFormModule,
     NzInputModule,
      NzButtonModule,
      ReactiveFormsModule,
      NzIconModule,
      RouterLink,
      NzSelectModule
      
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
