import { ExportToCsv } from 'export-to-csv';

export const exportSurveyResults = survey => {
  const data = survey.answers.map(response => {
    const row = {};
    response.forEach(a => {
      const q = survey.questions.find(q => a.questionId === q.id);
      const text = q.text.replace(',', '-');
      if (q.type === 'text' && a.text.length > 1) row[text] = a.text.replace(',','-');
      else if (q.type === 'scale' && a.scaleValue > 0) row[text] = a.scaleValue;
      else if (q.type === 'multiple' && a.options.length > 0) row[text] = a.options.join(', ');
    });
    return row;
  })

  const options = { 
    filename: `${survey.title} - Results`,
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true, 
    showTitle: true,
    title: survey.title,
    useBom: true,
    useKeysAsHeaders: true
  };

  const csvExporter = new ExportToCsv(options);
  csvExporter.generateCsv(data);
};