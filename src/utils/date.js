const getFullDate = () => {

  const now = new Date();

  return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

};

module.exports = { getFullDate };
