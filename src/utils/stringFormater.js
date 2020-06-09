// Will capitalize every part of the word
const capitalize = name => name.split(' ').map(namePart => namePart.charAt(0).toUpperCase() + namePart.slice(1))
  .join(' ');

module.exports = { capitalize };
