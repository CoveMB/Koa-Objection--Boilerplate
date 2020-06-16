// Will capitalize every part of the word
const capitalizeAll = word => word.split(' ').map(wordPart => wordPart.charAt(0).toUpperCase() + wordPart.slice(1))
  .join(' ');

const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

module.exports = {
  capitalize, capitalizeAll
};
