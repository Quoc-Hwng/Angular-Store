import { Component, OnInit,  Input, Output ,EventEmitter, TemplateRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { Employee } from 'src/app/models/employee'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestApiService } from 'src/app/service/rest-api.service';

@Component({
  selector: 'app-update-infor',
  templateUrl: './update-infor.component.html',
  styleUrls: ['./update-infor.component.css']
})
export class UpdateInforComponent implements OnInit {

  @Input("id")
  editId!: string;
  doing=false;
  @Output()
  url = 'https://desolate-dusk-27866.herokuapp.com/api/v1/auth';
  btnDisabled= false;
  employee: Employee;
  updateFinished: EventEmitter<string> = new EventEmitter<string>();
  constructor(private modelService: NgbModal,
    private rest:RestApiService,
    private data: DataService,
    private fb: FormBuilder) { }
    infome = this.fb.group({
      "displayName":["",[Validators.required,Validators.minLength(2)]],
      "email":["",[Validators.required,Validators.email]],
      "phone":["",[Validators.required,Validators.min(0)]],
      "address":["",[Validators.required]],
     })

  ngOnInit() {
    if(this.editId!==''){
      this.doing=true;
      this.rest.getOne(this.url,this.editId)
        .then((data:any) =>{
          console.log(data);
          this.doing=false;
          this.employee =(data.user as Employee)
        }).catch(error =>{
          this.doing =false;
          this.data.error(error['message'])
        });
        this.btnDisabled=true;
      }
  }
  open(content: TemplateRef<any>){
    this.modelService.open(content, {ariaDescribedBy: 'modal-basic-title'});
  }
  update(){
    this.doing=true;
    this.rest.patch(this.url + '/user/updateMe',this.employee)
      .then(data =>{
        this.doing=false;
        this.updateFinished.emit('product is update')
        this.modelService.dismissAll();
        this.employee = new Employee();
        this.ngOnInit();
      }).catch(error =>{
        this.doing =false;
        this.data.error(error['lỗi'])
      });

  }

}
