
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client( process.env.GOOGLE_ID );

export const googleVerify = async ( googleToken ) => {

    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience:  process.env.GOOGLE_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
  
    const { name, email, picture } = payload
  
    return { name, email, picture }
  
  }
  