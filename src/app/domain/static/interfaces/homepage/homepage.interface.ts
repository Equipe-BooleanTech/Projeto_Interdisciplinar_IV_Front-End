import { prospectionFields } from "@domain/static/data";

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
    section1: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: boolean;
    };
    section2: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: boolean;
    };
    section3: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: boolean;
    };
    section4: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: boolean;
    };
    form: {
        title: string;
        description: string;
        fields: typeof prospectionFields;
        submitButtonLabel: string;
    };
}