import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CollegeService {
  private apiUrl = 'http://localhost:8080'; // adjust backend URL

  constructor(private http: HttpClient) {}

  //  Register
  registerCollege(college: Omit<College, 'id'>): Observable<College> {
    return this.http.post<College>(this.apiUrl, college);
  }

  //  Get All
  getColleges(): Observable<College[]> {
    return this.http.get<College[]>(this.apiUrl);
  }

  //  Update
  updateCollege(id: number, college: College): Observable<College> {
    return this.http.put<College>(`${this.apiUrl}/${id}`, college);
  }

  // Delete
  deleteCollege(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
