import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Parcel } from '../parcel';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ParcelService } from '../parcel.service';
import { error } from 'node:console';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrl: './parcel.component.css'
})
export class ParcelComponent {

  title = 'parcel-management-app';
  shownColumns: string[] = ['sku', 'description', 'streetAddress', 'town', 'country', 'deliveryDate'];

  dataSource!: MatTableDataSource<Parcel>;
  posts:any;
  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.paginator && this.sort) {
     this.applyFilter('');
    }
  }

  constructor(private service: ParcelService){
    this.service.getAllParcels().subscribe((data)=>{
      this.posts = data;
      this.dataSource = new MatTableDataSource<Parcel>(this.posts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },(error)=>{
      this.dataSource = new MatTableDataSource<Parcel>([]);
    });
  }

  applyFilter(filterValue: string){

    this.dataSource.filterPredicate = function(data, filterValue: string): boolean {
      return data.description.toLowerCase().includes(filterValue) || data.country.toLowerCase().includes(filterValue);
  };

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }
}
