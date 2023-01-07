const getMaxCols = () => {
  const colWidth = 26;
  const screenWidth = document.body.offsetWidth;
  return Math.floor(screenWidth / colWidth);
};

export default getMaxCols;
