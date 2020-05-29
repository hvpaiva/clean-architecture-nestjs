export function setEnvironment() {
  switch (process.env.NODE_ENV) {
    case 'test':
      return ['.env.test', '.env'];
    case 'stage':
      return ['.env.stage', '.env'];
    case 'development':
      return ['.env.development', '.env'];
    case 'production':
    default:
      return '.env';
  }
}