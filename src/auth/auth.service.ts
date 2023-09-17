import {  Injectable } from '@nestjs/common';
import {  HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
type googleUser = {
    sub: string;
    name: string;
    given_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };
@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async getAccessToken(
    code: string,
    client_id: string,
    client_secret: string,
    redirect_uri: string,
  ): Promise<any> {
    const headersRequest = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const bodyRequest = {
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: 'authorization_code',
    };

    try {
      const response = await this.httpService
        .post('https://oauth2.googleapis.com/token', bodyRequest, {
          headers: headersRequest,
        })
        .pipe(
          map((response) => response),
          catchError((error) => {
            // Handle errors here, log or return an error response
            console.error('Error making API request:', error.error);
            return throwError('Error making API request');
          }),
        )
        .toPromise();

      return response;
    } catch (error) {
      // Handle errors here, log or return an error response
      console.error('Error in try-catch block:', error);
      throw error;
    }
  }
  async getRefreshToken(
    client_id: string,
    client_secret: string,
    refresh_token: string,
  ){
    const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
  
      const bodyRequest = {
        client_id,
        client_secret,
        refresh_token,
        grant_type: 'refresh_token',
      };
  
      try {
        const response = await this.httpService
          .post('https://oauth2.googleapis.com/token', bodyRequest, {
            headers: headersRequest,
          })
          .pipe(
            map((response) => response),
            catchError((error) => {
              // Handle errors here, log or return an error response
              console.error('Error making API request:', error);
              return throwError('Error making API request');
            }),
          )
          .toPromise();
  
        return response;
      } catch (error) {
        // Handle errors here, log or return an error response
        console.error('Error in try-catch block:', error);
        throw error;
      }
  }

  //The token can be an access token or a refresh token. If the token is an access token and it has a corresponding refresh token, the refresh token will also be revoked.
  async revokeToken(
    token:string 
  ){
    const headersRequest = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
  
  
      try {
        const response = await this.httpService
          .post(`https://oauth2.googleapis.com/revoke?token=${token}`, {
            headers: headersRequest,
          })
          .pipe(
            map((response) => response),
            catchError((error) => {
              // Handle errors here, log or return an error response
              console.error('Error making API request:', error);
              return throwError('Error making API request');
            }),
          )
          .toPromise();
  
        return response;
      } catch (error) {
        // Handle errors here, log or return an error response
        console.error('Error in try-catch block:', error);
        throw error;
      }
  }

  async getProfile(accessToken:string,idToken:string){
    const headersRequest = {
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${idToken}`,
      };
  
  
      try {
        const response = await this.httpService
          .post(`https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${accessToken}`, {
            headers: headersRequest,
          })
          .pipe(
            map((response) => response),
            catchError((error) => {
              // Handle errors here, log or return an error response
              console.error('Error making API request:', error.message);
              return throwError('Error making API request');
            }),
          )
          .toPromise();
  
        return response;
      } catch (error) {
        // Handle errors here, log or return an error response
        console.error('Error in try-catch block:', error);
        throw error;
      }
  }
}
