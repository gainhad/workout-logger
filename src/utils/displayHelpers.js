function prettyDisplayTime(seconds) {
  let displayMinutes = Math.floor(seconds / 60);
  let displaySeconds = Math.floor(seconds % 60);
  return displaySeconds < 10
    ? `${displayMinutes}:0${displaySeconds}`
    : `${displayMinutes}:${displaySeconds}`;
}

export { prettyDisplayTime };
