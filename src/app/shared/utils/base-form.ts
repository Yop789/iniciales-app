import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BaseForm {
  constructor() {}

  isvalidField(form: AbstractControl | null) {
    var flag = false;
    if (form != null) {
      flag = form.touched || form.dirty && !form.valid;
    }
    return flag;
  }

  getErrorMessage(form: AbstractControl | null) {
    let menssage = '';
    if (form) {
      const { errors } = form;
      if (errors) {
        const menssages: any = {
          required: 'Campo requerido',
          email: 'Formato invalido',
          pattern: 'Formato invalido',
          minError: 'El campo no es correcto',
          min: 'El campo no es correcto',
          max: 'El campo no es correcto',
        };

        const errorKey = Object.keys(errors).find(Boolean);
        if (errorKey) {
          menssage = menssages[errorKey];
        }
      }
    }
    return menssage;
  }
}
