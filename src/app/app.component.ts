import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService } from './college.service';

interface College {
  id: number;
  collegeName: string;  
  collegeCode: string;   
  departments: string;   
  fees: number;          
  address: string;       
  emailId: string;       
  phoneNo: number;   
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'college-module';

  // Store all colleges
  collegeDetails: College[] = [];

  // College object to update
  collegeToUpdate: College = {
    id: 0,
   collegeName: '',  
   collegeCode: '',   
   departments: '',   
   fees: 0,          
   address: '',       
   emailId: '',       
   phoneNo: 0, 
  };  
  
  

  constructor(private collegeService: CollegeService) {
    this.getCollegeDetails();
  }

  //  Register College
 register(registerForm: NgForm) {
  if (registerForm.invalid) return;

  const newCollege: Omit<College, 'id'> = registerForm.value; // exclude id
  this.collegeService.registerCollege(newCollege).subscribe(
    (resp: College) => {
      console.log("Registered:", resp);
      this.getCollegeDetails(); // refresh table
      registerForm.reset();
    },
    (err) => console.error("Register error:", err)
  );
}


  //  Get All Colleges
  getCollegeDetails() {
    this.collegeService.getColleges().subscribe(
      (resp: any) => {
        console.log("All colleges:", resp);
        this.collegeDetails = resp as College[]; // force array type
      },
      (err: any) => {
        console.error("Get error:", err);
      }
    );
  }

  //  Delete College
  deleteCollege(college: College) {
    this.collegeService.deleteCollege(college.id).subscribe(
      (resp: any) => {
        console.log("Deleted:", resp);
        this.getCollegeDetails();
      },
      (err: any) => {
        console.error("Delete error:", err);
      }
    );
  }

  //  Load selected college into form
  edit(college: College) {
    this.collegeToUpdate = { ...college }; // clone object
  }

  //  Update College
  updateCollege(updateForm: NgForm) {
    if (updateForm.invalid) return;

    if (this.collegeToUpdate.id > 0) { // ensure valid id
      this.collegeService.updateCollege(this.collegeToUpdate.id, this.collegeToUpdate).subscribe(
        (resp: any) => {
          console.log("Updated:", resp);
          this.getCollegeDetails();
        },
        (err: any) => {
          console.error("Update error:", err);
        }
      );
    }
  }
}
