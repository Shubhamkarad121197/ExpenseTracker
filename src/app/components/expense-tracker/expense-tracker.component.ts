import { NgFor } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-tracker',
  standalone: true,
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss'
})
export class ExpenseTrackerComponent implements OnChanges,OnInit {
Expenseform!:FormGroup;
totalExpense:number=0;
constructor(){
  this.Expenseform=new FormGroup({
    itemName: new FormControl('',Validators.required),
    itemPrice:new FormControl('',Validators.required)
  })
 
  
}
  ngOnInit(): void {
   
      if (typeof localStorage !== 'undefined') {
        // Retrieve data from localStorage and parse it into expenseContainer
        const storedData = localStorage.getItem('storeData');
        this.expenseContainer = storedData ? JSON.parse(storedData) : [];
        this.calculateTotal();
      }
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.addExpense();
   
  }

existingData:any=[];
expenseContainer:any=[];
addExpense() {
  if (this.Expenseform.valid) {
   
    this.existingData = localStorage.getItem('storeData');
    this.expenseContainer = this.existingData ? JSON.parse(this.existingData) : [];
    this.expenseContainer.push(this.Expenseform.value);
    console.log(this.expenseContainer)
    let storeData = JSON.stringify(this.expenseContainer);
    localStorage.setItem('storeData', storeData);
    this.calculateTotal();
  }
}
removeItem(index: number) {
  // Retrieve existing data from localStorage
  this.existingData = localStorage.getItem('storeData');
  if (this.existingData) {
    this.expenseContainer = JSON.parse(this.existingData);

    // Remove the specific item from the array
    this.expenseContainer.splice(index, 1);

    // Update localStorage with the modified array
    localStorage.setItem('storeData', JSON.stringify(this.expenseContainer));
    this.calculateTotal();
  }
}
calculateTotal(): number {
  // Ensure expenseContainer is an array and not undefined
  if (Array.isArray(this.expenseContainer)) {
    return this.expenseContainer.reduce((total, expense) => {
      return total + (expense.itemPrice ? parseFloat(expense.itemPrice) : 0);
    }, 0);
  }
  return 0;
}
}
