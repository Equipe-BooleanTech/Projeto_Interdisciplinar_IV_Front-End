import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FaqComponent, SidebarComponent } from '@presentation/view/components';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [SidebarComponent, FaqComponent, NgForOf],  
  templateUrl: './questions.component.html',
  styles: ``,
})
export class QuestionsComponent {
  faqList = [
    { question: 'O que é o sistema de gerenciamento interno?', answer: 'O sistema é uma ferramenta que facilita a gestão de reservas, pedidos, estoque e finanças do restaurante.' },
    { question: 'Como faço login no sistema? ', answer: 'Use seu nome de usuário e senha fornecidos pela administração. Se esquecer a senha, solicite a redefinição.' },
    { question: 'Como acessar o relatório de vendas?', answer: 'Na tela inicial, em Painel de controle clique em "Gerar Relatórios" e selecione o que deseja gerar de relatório. Você pode filtrar por data e tipo de produto' },
    { question: 'O que fazer se tiver dificuldades com o sistema?', answer: 'Entre em contato com a equipe de suporte.'},
    { question: 'Como lidar com um cliente insatisfeito?', answer: 'Ouça as reclamações do cliente, ofereça soluções e, se necessário, chame um supervisor para ajudar.'},
    { question: 'Como adicionar ingrediente ao sistema?', answer: 'Para cadastrar um novo ingrediente no sistema é preciso acessar a área de Gerenciamento de estoque > Ingredientes. Antes de cadastrar o ingrediente é preciso que o fornecedor do ingrediente já esteja cadastrado, para ser possível seleciona-lo ao cadastrar o mesmo.'},
    { question: 'Como cadastrar um fornecedor?', answer: 'Para cadastrar um novo fornecedor no sistema é preciso acessar a área de Gerenciamento de estoque > fornecedores, preencher o formulário e salvá-lo, assim o fornecedor será cadastrado.'},
    { question: 'Como cadastrar uma ficha técnica?', answer: 'Para cadastrar uma nova ficha ou um grupo de fichas novas, vá em Gerenciamento de estoque > fichas técnicas. Nesta página haverá um botão no início da página “cadastrar nova ficha”, preencha o formulário e salve-o. Para criar um grupo de fichas é preciso antes ter criado uma ficha e adiciona-la ao grupo.'}
  ];
}
