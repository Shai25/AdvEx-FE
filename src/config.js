export default {
  API_PREFIX: (process.env.NODE_ENV === 'production' ? 'https://api.advex.org' : 'http://localhost:5000'),
  AWS_LAMBDA_GETSIGNEDURL_ENDPOINT: 'https://qg7mmm4c1f.execute-api.us-east-1.amazonaws.com/dev/getsignedurl'
}
