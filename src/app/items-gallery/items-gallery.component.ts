import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ItemService } from '../item.service';
import { UserService } from '../user.service';
import { Item } from '../models/item';
import { MdbTableDirective, ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-items-gallery',
  templateUrl: './items-gallery.component.html',
  styleUrls: ['./items-gallery.component.scss']
})
export class ItemsGalleryComponent implements OnInit {

  items: Item[];

  isAdmin: boolean;

  editField: string;

  searchText: string = '';
  previous: string;

  newItem: Item;

  noResults: boolean;

  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective;

  @ViewChild('frame', { static: true }) frame: ModalDirective;

  @HostListener('input') oninput() {
    this.searchItems();
  }

  constructor(private itemService: ItemService,private userService: UserService) { }


  ngOnInit() {
    this.itemService.items$.subscribe((items) => {
      this.items = items;
      this.mdbTable.setDataSource(this.items);
      this.previous = this.mdbTable.getDataSource();
    });

    this.isAdmin = this.userService.isAdmin;
    this.newItem = {
      name: '',
      barcode: '',
      sellingPrice: 0,
      costPrice: 0
    };
    this.noResults = false;
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    let item = this.itemService.getItem(id)[0];
    item[property] = editField;
    this.itemService.editItem(item);
  }

  remove(id: any) {
    this.itemService.deleteItem(id);
  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    this.noResults = false;
    
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.items = this.mdbTable.getDataSource();
      if (this.items.length == 0)
        this.noResults = true;
    }
    if (this.searchText) {
      this.items = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
      if (this.items.length == 0)
        this.noResults = true;
    }
  }

  addItem(){
    this.itemService.addItem(this.newItem);
    this.resetItem();
    this.frame.hide();

  }

  resetItem(){
    this.newItem = {
      name: '',
      barcode: '',
      sellingPrice: 0,
      costPrice: 0
    };
  }

}
