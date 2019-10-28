function oneToTwoDigits(number) {
  return number.toString().length < 2 ? `0${number}` : `${number}`;
}

function dividedTimeToOne(dividedTimeString, seperator) {
  const timeCol = dividedTimeString.split(seperator);
  const one = 60 * Number(timeCol[0]) + Number(timeCol[1]);
  return one;
}

export { dividedTimeToOne, oneToTwoDigits };
