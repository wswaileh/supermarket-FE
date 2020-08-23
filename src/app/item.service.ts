import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './models/item';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  _baseUrl = "http://localhost:8080/items";

  private readonly _items: BehaviorSubject<Item[]> = new BehaviorSubject([]);;

  readonly items$ = this._items.asObservable();

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService
  ) {
    this._http.get<Item[]>(this._baseUrl).subscribe(
      (items) => {
        this.items = items;
      },
      (_) => {
        this._toastr.error("حدث خطا اثناء جلب البيانات!");
      }
    )
  }

  get items() {
    return this._items.getValue();
  }

  set items(val: Item[]) {
    this._items.next(val);
  }

  addItem(newItem: Item) {
    this._http.post(this._baseUrl, newItem, { observe: 'response' }).subscribe(
      (res) => {
        if (res.status == 200) {
          this._toastr.success("تمت اضافة الصنف بنجاح!");
          this.items = [
            ...this.items,
            newItem
          ];
        }

      },
      (_) => {
        this._toastr.error("حدث خطأ اثناء اضافة الصنف!!");
      }
    )
  }

  getItem(id: number){
    return this.items.filter((item)=>item.id == id);
  }

  editItem(editedItem: Item) {

    let user = this.items.find(item => item.id === editedItem.id);
    if (user) {

      this._http.put(
        this._baseUrl + "/" + editedItem.id, editedItem, { observe: 'response' })
        .subscribe(
          (res) => {
            if (res.status == 200) {
              this._toastr.success("تم تعديل الصنف بنجاح!");
              const index = this.items.indexOf(user);
              
              this.items[index] = {
                ...editedItem
              }

              this.items = [...this.items];
            }
          },
          (_) => {
            this._toastr.error("حدث خطأ اثناء تعديل الصنف!!");
          }
        )

    }

  }

  deleteItem(id: number) {
    this._http.delete(this._baseUrl + "/" + id, { observe: 'response' }).subscribe(
      (res) => {
        if (res.status == 200) {
          this._toastr.success("تم حذف الصنف بنجاح!")
          this.items = this.items.filter(item => item.id != id);
        }
      },
      (_) => {
        this._toastr.error("حدث خطأ اثناء حذف الصنف!!");
      }
    )
  }


}
