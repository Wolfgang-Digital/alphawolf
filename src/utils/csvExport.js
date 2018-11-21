import { ExportToCsv } from 'export-to-csv';

export const exportSurveyResults = survey => {
  const data = survey.answers.map(a => {
    const row = a.reduce((acc, curr) => {
      const question = survey.questions.find(q => q.id === curr.questionId);
      if (question.type === 'text' && curr.text.length > 1) acc[question.text] = curr.text;
      if (question.type === 'scale') acc[question.text] = curr.scaleValue;
      if (question.type === 'multiple') {
        const options = curr.options.map(n => question.options[n]);
        acc[question.text] = options.join(', ');
      }
      return acc;
    }, {});
    return row;
  });

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