import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  newCategory = { name: '', type: '', parent: null };
  availableParents: any[] = [];
  errorMessage: string = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadAvailableParents();
  }

  loadCategories() {
    this.categoryService.listCategories().subscribe(
      (data) => {
        this.categories = data;
        this.categories.forEach(category => {
          category.hasChildren = this.categories.some(child => child.parent && child.parent._id === category._id);
        });
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  loadAvailableParents() {
    if (this.newCategory.type === 'subcategory') {
      this.availableParents = this.categories.filter(category => category.type === 'category');
    } else if (this.newCategory.type === 'topic') {
      this.availableParents = this.categories.filter(category => category.type === 'subcategory');
    } else {
      this.availableParents = [];
    }
  }

  createCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe(
      () => {
        this.newCategory = { name: '', type: '', parent: null };
        this.loadCategories();
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.loadCategories();
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }
}

