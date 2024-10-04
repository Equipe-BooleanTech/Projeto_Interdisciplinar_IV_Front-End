import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-fornecedor',
  standalone: true,
  imports: [
    SidebarComponent, 
    FormComponent, ButtonComponent,
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './fornecedor.component.html',
  styles: ``
})


export class FornecedorComponent implements OnInit {
  supplierForm!: FormGroup;

  suppliersFields = {
    fields: [
      {
          component: 'input',
          name: 'nameSupplier',
          type: 'text',
          label: 'Nome do Fornecedor: *',
          id: 'fullName',
          value: '',
          placeholder: 'Digite aqui o nome do Fornecedor...',
          validations: [
              {
                  name: 'required',
                  message: 'Nome do Fornecedor é obrigatório',
                  value: '',  
              },
          ],
      },
      {
          component: 'input',
          name: 'CNPJ',
          type: 'text',
          label: 'CNPJ: *',
          id: 'CNPJ',
          placeholder: 'Digite aqui o CNPJ do Fornecedor...',
          value: '',
          validations: [
            {
              name: 'required',
              message: 'CNPJ do Fornecedor é obrigatório',
              value: '',  
          },
          ],
      },
      {
          component: 'input',
          name: 'contact',
          type: 'text',
          id: 'contact',
          value: '',
          placeholder: 'Digite o nome do contato do Fornecedor...',
          label: 'Nome Contato:',
          validations: [],
      },
      {
          component: 'input',
          name: 'phone',
          type: 'text',
          id: 'phone',
          value: '',
          placeholder: 'Digite o número de telefone do Fornecedor...',
          label: 'Telefone:',
          validations: [],
      },
  ],
  };
    constructor(private fb: FormBuilder) {
      this.supplierForm = this.fb.group({
        nameSupplier: ['', Validators.required],
        CNPJ: ['', []],
        contact: ['', []],
        phone: ['', []],
      });
    }
  
    ngOnInit(): void {}
  
    onSubmit(): void {
      if (this.supplierForm.valid) {
        console.log(this.supplierForm.value);
        // Adicione aqui a lógica para salvar o fornecedor
      }
    }
  }



