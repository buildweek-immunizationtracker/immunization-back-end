const jwtSecret =
  process.env.JWT_SECRET ||
  'The woods are lovely, dark and deep, But I have promises to keep, And miles to go before I sleep, And miles to go before I sleep.';

const port = process.env.PORT || 5000;

const seedPW = process.env.SEED_PW || 'password';

module.exports = {
  jwtSecret,
  port,
  seedPW,
};
