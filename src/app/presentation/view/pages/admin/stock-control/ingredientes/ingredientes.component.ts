import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent, FormComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-ingredientes',
  standalone: true,
  imports: [
    SidebarComponent,
    FormComponent,
    ButtonComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './ingredientes.component.html',
  styles: ``
})
export class IngredientesComponent implements OnInit {
  ingredientForm!: FormGroup;

  // Importando o objeto que contém os campos
  ingredientsFileds = {
    fields: [
      {
        component: 'input',
        name: 'nameIngredient',
        type: 'text',
        label: 'Nome do Ingrediente: *',
        id: 'nameIngredient',  // Ajuste o ID para corresponder ao nome
        placeholder: 'Digite aqui o nome do Ingrediente...',
        validations: [
          {
            name: 'required',
            message: 'Nome do Ingrediente é obrigatório',
            value: '',
          },
        ],
      },
      {
        component: 'select',
        name: 'categorysupplier',
        label: 'Fornecedor: ',
        options: [
          { value: '', label: 'Selecione um fornecedor' },
          { value: '1', label: 'Gomes da Costa' },
          { value: '2', label: 'Oxan' },
          { value: '3', label: 'Assai' },
          { value: '4', label: 'Atacadão' },
          { value: '5', label: 'Unilever' },
        ],
      },
      {
        component: 'input',
        name: 'description',
        type: 'text',
        id: 'description',
        placeholder: 'Faça uma breve descrição do produto...',
        label: 'Descrição: ',
        validations: [],
      },
      {
        component: 'input',
        name: 'price',
        type: 'text',
        id: 'price',
        placeholder: 'Digite o valor do produto...',
        label: 'Preço: *',
        validations: [
          {
            name: 'required',
            message: 'O preço do ingrediente é obrigatório',
            value: '',
          },
        ],
      },
    ],
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Criando o formulário com base nos campos definidos
    this.ingredientForm = this.fb.group({
      nameIngredient: ['', Validators.required],
      categorysupplier: ['', Validators.required],
      description: [''],
      price: ['', Validators.required], // Adicionando validação para preço
    });
  }

  onSubmit() {
    if (this.ingredientForm.valid) {
      console.log(this.ingredientForm.value);
      // Aqui você pode enviar os dados para o backend ou fazer outra ação
    } else {
      console.log('Formulário inválido');
    }
  }
}
