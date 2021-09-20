import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SatWsService } from '../services/satWs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  constructor(
    private satWsService: SatWsService,
    private titleService: Title,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.titleService.setTitle('SB Financials | Solicitud');
  }

  @ViewChild('modalSuccess') modalSuccess;
  @ViewChild('modalError') modalError;


  public submitted = false;
  public creationType = 1;
  public errorText = '';
  public ciecData = {
      type: 'ciec',
      rfc: '',
      password: ''
  };
  public esignData = {
    certificate: [],
    privateKey: [],
    password: ''
  };

  ngOnInit(): void {
  }

  clickFileInput(fileInput) {
    document.getElementById(fileInput).click();
  }

  changeFileInput(fileInput, fileText, e) {
      const routeSplited = (document.getElementById(fileInput) as HTMLInputElement).value.split('\\');
      const fileName = routeSplited[routeSplited.length - 1];

      (document.querySelector('#' + fileText) as HTMLInputElement).value = fileName;

      if (e.srcElement.files.length > 0) {
        return e.srcElement.files[0];
      } else {
        return [];
      }
  }

  goToHome(modal) {
    modal.close();
    window.location.href = "https://www.sbfinancial.com.mx/leasing/";
  }

  resendCertCreation(modal, form1, form2) {
      modal.close();

      if (this.creationType == 1) {
          this.createCertWithCiec(form1);
      }
      if (this.creationType == 2) {
        this.createCertWithEsign(form2);
      }
  }

  createCertWithCiec(form) {
      this.submitted = true;
      this.creationType = 1;
      const data = {...this.ciecData};

      if (!form.valid) {
        return;
      }

      this.createCert(data);
  }

  async createCertWithEsign(form) {
      this.submitted = true;
      this.creationType = 2;

      if (!form.valid || this.esignData.certificate.length == 0 || this.esignData.privateKey.length == 0) {
        return;
      }

      const data = {
          type: 'efirma',
          certificate: '',
          privateKey: '',
          password: this.esignData.password,
      };

      const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });

      console.log(this.esignData.certificate);
      console.log(this.esignData.privateKey);

      const certificate = await toBase64(this.esignData.certificate).catch(e => Error(e));
      const privateKey = await toBase64(this.esignData.privateKey).catch(e => Error(e));

      data.certificate = String(certificate).split('base64,')[1];
      data.privateKey = String(privateKey).split('base64,')[1];

      this.createCert(data);
  }

  createCert(data) {
    this.errorText = '';

    this.satWsService.createCredentials(data).subscribe((result: any) => {
      console.log(result)
      if (result.response.response.id) {
        this.modalService.open(this.modalSuccess, {
            size: 'lg',
            centered: true,
            backdrop: 'static',
            keyboard: false
        });
      } else {
        if (result.response.response.detail) {
          this.errorText = result.response.response.detail;
        }
        if (result.response.response.message) {
          this.errorText = result.response.response.message;
        }
        this.modalService.open(this.modalError, {
            size: 'lg',
            centered: true,
            backdrop: 'static',
            keyboard: false
        });
      }
    });
  }

}
