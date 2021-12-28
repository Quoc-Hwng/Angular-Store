import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-edit-brands',
  templateUrl: './edit-brands.component.html',
  styleUrls: ['./edit-brands.component.css']
})
export class EditBrandsComponent implements OnInit {

  doing=false;
  brand: Brand;
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/admin/brand/edit'
  @Input("id")
  editId!: string;

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder,
    private storage: AngularFireStorage) {
      this.brand= new Brand;
     }

     infoBrand = this.fb.group({
      "nameBrand":["",
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
      ])],
    "codeBrand":["",[Validators.required,Validators.minLength(2),]],
      "description":["",[Validators.required,Validators.minLength(20)]],
      // "imgs":["",[Validators.required]],
      "state":["",[Validators.required]],
     })
     get f(){
       return this.infoBrand.controls
     }

  ngOnInit() {
    this.doing=true;

    this.rest.getOne(this.url1,this.editId)
      .then(data =>{
        this.doing=false;
        this.brand =(data as {brand: Brand}).brand;
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;

    this.rest.put(this.url1,this.editId,this.brand)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('brand is update')
        this.modelService.dismissAll();
        this.brand = new Brand();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['message'])
      });

  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file).then(data =>{
      console.log(data);
      getDownloadURL(data.ref).then(data =>{
        console.log(data);
        this.brand.imgs = data;
      })
    }).catch(error =>{
      console.log(error);
    });
  }

}
