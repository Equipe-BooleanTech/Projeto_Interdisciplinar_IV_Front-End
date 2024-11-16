import jsPDF from 'jspdf';
import { lastValueFrom, Observable } from 'rxjs';
import { ListByPeriodResponse } from '@domain/dtos';

type SectionData = {
    title: string;
    fetchData: () => Observable<ListByPeriodResponse<any>>;
    formatItem: (item: any) => string;
};

export const generateReport = (sections: SectionData[]) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Relatório de Estoque', 105, 10, { align: 'center' });

    const fetchDataPromises = sections.map((section) =>
        lastValueFrom(section.fetchData()),
    );

    Promise.all(fetchDataPromises)
        .then((results) => {
            let currentY = 30;

            results.forEach((data, index) => {
                const section = sections[index]; // Associa explicitamente a seção ao índice
                const typedData = data;

                currentY = _addSectionToPDF(
                    doc,
                    section.title,
                    typedData.items,
                    section.formatItem,
                    currentY,
                );
            });

            doc.save('relatorio.pdf');
        })
        .catch((error) => {
            console.error('Erro ao gerar relatório:', error);
            alert(
                'Ocorreu um erro ao gerar relatório. Tente novamente mais tarde.',
            );
        });
};


const _addSectionToPDF = (
    doc: jsPDF,
    title: string,
    items: any[],
    formatItem: (item: any) => string,
    startY: number,
) => {
    doc.setFontSize(14);
    doc.text(title, 10, startY);
    let currentY = startY + 10;

    items.forEach((item, index) => {
        doc.text(formatItem(item), 10, currentY);
        currentY += 8;
    });

    return currentY;
};
