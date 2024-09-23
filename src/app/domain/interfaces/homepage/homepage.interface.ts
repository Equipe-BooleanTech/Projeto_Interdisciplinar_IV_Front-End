export interface Homepage {
    intro: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
    };
    cardsContent: {
        id: number;
        icon: string;
        title: string;
        description: string;
    }[];
    section: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: string;
    };
    form: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        fields: {
            component: string;
            name: string;
            type: string;
            label: string;
            value: string;
            placeholder: string;
            validations: {
                name: string;
                message: string;
            }[];
        }[];
    };
}
