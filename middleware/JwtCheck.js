import { auth } from "express-oauth2-jwt-bearer";


const jwtCheck = auth({
    audience: 'Calender-event',
    issuerBaseURL: 'https://dev-gfemhuwpuvafhw4p.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

export default jwtCheck