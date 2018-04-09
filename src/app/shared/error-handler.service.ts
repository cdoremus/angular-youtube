import { Injectable, ErrorHandler, Injector } from '@angular/core';

export interface ErrorResponse {
  headers: Object;
  status: number;
  statusText: string;
  url: string;
  message: string;
  ok: boolean;
  name: string;
  error: Event | YouTubeApiErrorResponse;
}

export interface YouTubeApiErrorResponse {
  error: {
    errors: { domain: string, reason: string, message: string }[]
    code: number;
    message: string;
  };
}

export const UIMessage = {
  0: 'Unknown Error. Please try again later and if the problem still persists, contact the application administrator.',
  400: 'Bad data request. Please try again later and if the problem still persists, contact the application administrator.',
  403: 'Data access not allowed. Please see the application administrator.',
  404: 'Data not found. Please see the application administrator.',
};

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor(private injector: Injector) {
    super();
  }

  handleError(error: ErrorResponse) {
    // get current date & time
    const now = new Date();
    console.error(`Error occurred (ErrorHandlerService#handleError): ${now}`);
    // alert the user with a non-technical message
    window.alert(`
      Application Error! \n\n
      Message: \n ${UIMessage[error.status] ? UIMessage[error.status] : UIMessage[0]} \n
      Error status: ${error.status} ${error.statusText} (${now})
    `);
    // log YouTube error data, if present
    const youtubeError = error.error as YouTubeApiErrorResponse;
    if (youtubeError.error) {
      youtubeError.error.errors.forEach ((err, index) => {
        console.error(`YouTube Api Error (# ${index + 1}): domain=${err.domain}; message=${err.message}; reason=${err.reason}`);
      });
      console.error('YouTubeApiError errors object', youtubeError.error.errors);
    } else {
      console.error('ErrorResponse error object', error.error);
    }
    // IMPORTANT: Rethrow the error otherwise error gets swallowed
    super.handleError(error);
 }

}
