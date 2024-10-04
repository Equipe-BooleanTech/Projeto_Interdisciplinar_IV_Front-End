import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-cadastro-colaborador',
  standalone: true,
  imports: [SidebarComponent, FormComponent, ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastro-colaborador.component.html',
  styles: ``
})
export class CadastroColaboradorComponent implements OnInit {
  employeeForm!: FormGroup;
  
  employeeFields = {
    fields: [
        {
            component: 'input',
            name: 'nameEmployee',
            type: 'text',
            label: 'Nome do Colaborador: *',
            id: 'fullName',
            value: '',
            placeholder: 'Digite aqui o nome do Colaborador...',
            validations: [
                {
                    name: 'required',
                    message: 'Nome do Colaborador é obrigatório',
                    value: '',  
                },
            ],
        },
        {
            component: 'input',
            name: 'CPF',
            type: 'text',
            label: 'CPF: *',
            id: 'CPF',
            placeholder: 'Digite aqui o CPF do Colaborador...',
            value: '',
            validations: [
              {
                name: 'required',
                message: 'CPF do Colaborador é obrigatório',
                value: '',  
            },
            ],
        },
        {
            component: 'input',
            name: 'email',
            type: 'text',
            id: 'email',
            value: '',
            placeholder: 'Digite o email institucional...',
            label: 'Email institucional:',
            validations: [],
        },
        {
            component: 'input',
            name: 'phone',
            type: 'text',
            id: 'phone',
            value: '',
            placeholder: 'Digite o número de telefone do colaborador...',
            label: 'Telefone: ',
            validations: [],
        },
        {
          component: 'select',
          name: 'categorysupplier',
          label: 'Função: ',
          options: [
            { value: '', label: 'Selecione uma função' },
            { value: '1', label: 'Ajudante geral' },
            { value: '2', label: 'Garçom' },
            { value: '3', label: 'Gerente' },
            { value: '4', label: 'Chefe de Cozinha' },
            { value: '5', label: 'Ajudante de Cozinha' },
          ],
        },
      
    ],
  };
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.employeeForm = this.fb.group({
      nameEmployee: ['', Validators.required],
      CPF: ['', Validators.required], 
      email: ['', [Validators.email]], 
      phone: [''], 
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      
    } else {
    }
  }
}


