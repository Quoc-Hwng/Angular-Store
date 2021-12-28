import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { RestApiService } from 'src/app/service/rest-api.service';
import { DataService } from 'src/app/service/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { getDownloadURL, ref, Storage } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.css']
})
export class AddBrandsComponent implements OnInit {
  saving=false;
  brand: Brand;
  url1='https://desolate-dusk-27866.herokuapp.com/api/v1/admin/brand/add'
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
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  save(){
    this.saving=true;

    this.rest.post(this.url1,this.brand)
      .then(data =>{
        this.saving=false;
        this.data.success('Thành Công');
      }).catch(error =>{
        this.saving =false;
        this.data.error(('Thất bại'))
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
