import { Component, OnInit } from '@angular/core';
import { BannerLayoutComponent } from './banner-layout/banner-layout.component';
import { DataTransferService } from '@infra/services';
import { SectionLayoutComponent } from './section-layout/section-layout.component';
import { CommonModule } from '@angular/common';
import { FormLayoutComponent } from './form-layout/form-layout.component';

@Component({
    selector: 'app-homepage-layout',
    standalone: true,
    imports: [
        BannerLayoutComponent,
        SectionLayoutComponent,
        CommonModule,
        FormLayoutComponent,
    ],
    templateUrl: './homepage-layout.component.html',
    styles: [],
})
export class HomepageLayoutComponent implements OnInit {
    constructor(private _dataTransferService: DataTransferService) {}

    data = {
        intro: {
            title: 'Otimize suas operações com uma solução pensada para o sucesso do seu negócio.',
            description:
                ' O sistema PDV Restaurantto consiste em uma plataforma fácil e intuitiva, personalizável para seu negócio. Entre em contato para maiores informações!',
            button: {
                text: 'Saiba mais!',
                link: '/#funcionalidades',
            },
            image: '../../../../assets/logo.svg',
        },
        cardsContent: [
            {
                id: 1,
                icon: 'icon-[lucide--users]',
                title: '+ de 1500 clientes atendidos',
                description:
                    'Nosso sistema é testado e aprovado por parceiros, o que garante sua confiabilidade!',
            },
            {
                id: 2,
                icon: 'icon-[solar--cloud-broken]',
                title: 'Custos mais baixos',
                description:
                    'Faça mais com menos!  Conosco, os custos com infraestrutura são reduzidos. Assim, você pode alocar sua atenção em outra coisa.',
            },
            {
                id: 3,
                icon: 'icon-[ri--check-double-fill]',
                title: 'Fácil e prático',
                description:
                    'Nosso sistema é intutitivo e fácil de usar, garantindo uma experiência satisfatória para oa nossos usuários parceiros!',
            },
        ],
        section1: {
            title: 'Customizado para atender as necessidades do seu negócio',
            description:
                'Transforme seu restaurante com nosso PDV personalizado, adaptado às suas necessidades. Oferecemos funcionalidades de cadastro de fornecedores, produtos, clientes, cardápios e muito mais, tudo ajustado para otimizar a gestão do seu negócio. Experimente a customização perfeita e veja como podemos facilitar seu dia a dia. Clique aqui para uma demonstração gratuita!',
            button: {
                text: 'Saiba mais!',
                link: '/#funcionalidades',
            },
            image: '../../../assets/section-01-layout.svg',
            reverse: false,
        },
        section2: {
            title: 'Integração com plataformas de pedidos on-line',
            description:
                'Integre seu restaurante às principais plataformas de pedidos on-line e maximize suas vendas com nossa solução de PDV completa. Com essa funcionalidade, você pode sincronizar pedidos de aplicativos como iFood, Uber Eats e Rappi diretamente no sistema, centralizando o controle de entregas, pagamentos e relatórios de desempenho. Tudo isso de forma automatizada e eficiente, garantindo uma gestão mais ágil e integrada. Experimente agora e descubra como podemos facilitar o gerenciamento dos seus pedidos on-line. Clique aqui para uma demonstração gratuita!',
            button: {
                text: 'Agende já sua demonstração!',
                link: '/#funcionalidades',
            },
            image: '../../../../assets/section-02-layout.svg',
            reverse: true,
        },
        section3: {
            title: 'Customize o catálogo, quando e onde quiser!',
            description:
                'Personalize seu catálogo com total liberdade, quando e onde quiser! Nossa plataforma oferece uma experiência totalmente ajustável, permitindo que você organize e modifique seus produtos, serviços e categorias de forma simples e prática. Seja para atualizar informações, incluir novos itens ou alterar preços, você tem o controle em suas mãos, tudo em tempo real. Experimente a flexibilidade e a facilidade de uso que nossa solução proporciona. Teste agora mesmo e transforme a gestão do seu catálogo!',
            button: {
                text: 'Saiba mais!',
                link: '/#funcionalidades',
            },
            image: '../../../../assets/section-03-layout.svg',
            reverse: false,
        },
        section4: {
            title: 'Gerencie seus fornecedores de forma prática',
            description:
                'Gerencie seus fornecedores de forma prática e eficiente com nossa solução. Tenha controle total sobre os cadastros, acompanhe pedidos, pagamentos e negociações, tudo em um só lugar. Facilite a comunicação e o gerenciamento das suas parcerias com ferramentas intuitivas que ajudam a otimizar sua operação. Experimente agora e veja como podemos simplificar sua gestão de fornecedores!',
            button: {
                text: 'Agende já sua demonstração!',
                link: '/#funcionalidades',
            },
            image: '../../../../assets/section-04-layout.svg',
            reverse: true,
        },
        form: {
            title: 'Entre em contato conosco!',
            description:
                'Entre em contato conosco e descubra como podemos ajudar a transformar a gestão do seu negócio. Nossa equipe está pronta para esclarecer suas dúvidas, fornecer suporte e apresentar as melhores soluções para suas necessidades. Não hesite em nos enviar uma mensagem, estamos aqui para te atender!',
            fields: [
                {
                    name: 'name',
                    label: 'Nome',
                    type: 'text',
                    validations: [{ name: 'required' }],
                },
                {
                    name: 'email',
                    label: 'E-mail',
                    type: 'email',
                    validations: [{ name: 'required' }, { name: 'email' }],
                },
                {
                    name: 'phone',
                    label: 'Telefone',
                    type: 'text',
                    validations: [{ name: 'required' }],
                },
                {
                    name: 'company',
                    label: 'Empresa',
                    type: 'text',
                    validations: [{ name: 'required' }],
                },
                {
                    name: 'message',
                    label: 'Mensagem',
                    type: 'textarea',
                    validations: [{ name: 'required' }],
                },
            ],
            button: {
                text: 'Enviar',
            },
        },
    };

    ngOnInit(): void {
        this.sendData();
    }
    sendData(): void {
        this._dataTransferService.setData(this.data);
    }
}
