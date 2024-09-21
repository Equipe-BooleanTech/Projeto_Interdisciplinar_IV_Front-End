export interface HomepageData {
    intro: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
    };
    cardsContent: Array<{
        icon: string;
        title: string;
        description: string;
    }>;
    section: {
        title: string;
        description: string;
        button: {
            text: string;
            link: string;
        };
        image: string;
        reverse: boolean;
    };
}