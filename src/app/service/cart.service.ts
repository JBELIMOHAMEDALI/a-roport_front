import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { SharedService } from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {
    key ="arryCart";
  constructor(

    private router?: Router,
    private sharedService?: SharedService,
  ) {}

  initializeKey(): void {
    if (localStorage.getItem(this.key) === null) {
      localStorage.setItem(this.key, JSON.stringify([]));
    }
  }
  // Method to add an item to the array in local storage
  addElementToArray( newItem: any): void {
    let array = JSON.parse(localStorage.getItem(this.key) || '[]'); // Get existing array or initialize an empty one
    const newIndex = array.length; // Index based on array length
    newItem.index = this.generateKey(); // Assign index to new item
    array.push(newItem); // Add new element to array
    localStorage.setItem(this.key, JSON.stringify(array));
  }

  generateKey(): string {
    // Exclude certain characters, for example: 'O', 'l', '1', '0'
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    const length = 4; // Fixed length of 4 characters
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
  }
  // Method to get all elements from the array in local storage
  getAllElements(): any[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]'); // Retrieve array from localStorage or return an empty array
  }
  // Method to get an element by index from the array in local storage
  getElementByKey( index: string): any {
    let array = JSON.parse(localStorage.getItem(this.key) || '[]'); // Get the existing array
    const foundItem = array.find((item: any) => item.index === index); // Find the object with the matching 'index'
    return foundItem;
  }
  // Method to delete an element by index from the array in local storage
  deleteElementByKey(key: string): void {
    let array = JSON.parse(localStorage.getItem(this.key) || '[]'); // Get existing array
    const index = array.findIndex((item: any) => item.index === key);
    if (index !== -1) {
      array.splice(index, 1); // Remove the element at the found index
      localStorage.setItem(this.key, JSON.stringify(array)); // Save updated array to localStorage
      swal("Success!", "The product has been successfully deleted from your panel.", "success");
      this.sharedService.reloadComponent(this.router);
   
    }
  }
  // Method to update an element by index in the array in local storage
  updateElementByKey( index: number, newItem: any): void {
    let array = JSON.parse(localStorage.getItem(this.key) || '[]'); // Get existing array
    if (index >= 0 && index < array.length) {
      array[index] = newItem; // Update element at specified index
      localStorage.setItem(this.key, JSON.stringify(array)); // Save updated array to localStorage
    }
  }
}