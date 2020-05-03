// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'q7fiuyxzb0'
export const apiEndpoint = `https://${apiId}.execute-api.ap-south-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-zbmja3bs.auth0.com',            // Auth0 domain
  clientId: 'Ime7FDMyccgJqG0f2hUCvL0H90z4lUD7',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
