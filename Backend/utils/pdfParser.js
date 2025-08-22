const pdfParse = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdfParse(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to parse PDF: ' + error.message);
  }
};

module.exports = { extractTextFromPDF };