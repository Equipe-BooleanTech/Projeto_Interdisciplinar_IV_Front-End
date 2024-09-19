import { Component } from '@angular/core';
import { ButtonComponent, CardComponent } from '@lib/components';

@Component({
    selector: 'app-homepage-layout',
    standalone: true,
    imports: [CardComponent, ButtonComponent],
    templateUrl: './homepage-layout.component.html',
    styles: ``,
})
export class HomepageLayoutComponent {
  data = {
    intro: {
        title: "Otimize suas operações com uma solução pensada para o sucesso do seu negócio.",
        description: " O sistema PDV Restaurantto consiste em uma plataforma fácil e intuitiva, personalizável para seu negócio. Entre em contato para maiores informações!",
        button: {
            text: "Saiba mais!",
            link: "/#funcionalidades",
    },
    image: "../../../../assets/logo.svg",
},

    cardsContent: [{
        "id": 1,
        "icon":"icon-[lucide--users]",
        "title": "+ de 1500 clientes atendidos",
        "description": "Nosso sistema é testado e aprovado por parceiros, o que garante sua confiabilidade!",
        
    },
    {
        "id": 2,
        "icon":"icon-[solar--cloud-broken]",
        "title": "Custos mais baixos",
        "description": "Faça mais com menos!  Conosco, os custos com infraestrutura são reduzidos. Assim, você pode alocar sua atenção em outra coisa.",
        
    },
    {
        "id": 3,
        "icon":"icon-[ri--check-double-fill]",
        "title": "Fácil e prático",
        "description": "Nosso sistema é intutitivo e fácil de usar, garantindo uma experiência satisfatória para oa nossos usuários parceiros!",
    }
],

  }}


