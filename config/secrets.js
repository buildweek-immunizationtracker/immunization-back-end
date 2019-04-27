const jwtSecret =
  process.env.JWT_SECRET ||
  'The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep, And miles to go before I sleep.';

const port = process.env.PORT || 5000;

module.exports = {
  jwtSecret,
  port,
};
