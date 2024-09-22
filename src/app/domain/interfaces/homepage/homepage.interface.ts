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
}
