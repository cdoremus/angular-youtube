import { Injectable, ErrorHandler } from '@angular/core';

/**
 * Data in the error response.
 */
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

/**
 * Data in the error response from the YouTube Data API
 */
export interface YouTubeApiErrorResponse {
  error: {
    errors: { domain: string, reason: string, message: string }[]
    code: number;
    message: string;
  };
}

/**
 * Holds non-technical messages for use in the UI. The keys
 * are know HTTP status codes from the YouTube Data API.
 */
export const UIMessage = {
  0: 'Unknown Error. Please try again later and if the problem still persists, contact the application administrator.',
  400: 'Bad data request. Please try again later and if the problem still persists, contact the application administrator.',
  403: 'Data access not allowed. Please see the application administrator.',
  404: 'Data not found. Please see the application administrator.',
};

/**
 * Service that replaces the built-in Angular error handler,
 * adding an alert() to show a non-technical message to the user
 * and additional logging.
 */
@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor() {
    super();
  }

  handleError(error: ErrorResponse) {
    // get current date & time and log it
    const now = new Date();
    console.error(`Error occurred (ErrorHandlerService#handleError): ${now}`);
    // alert the user with a non-technical message
    window.alert(`
      Application Error! \n\n
      Message: \n ${UIMessage[error.status] ? UIMessage[error.status] : UIMessage[0]} \n
      Error status: ${error.status} ${error.statusText} (${now})
    `);
    // log YouTube error data, if present
    if (error.error) {
      const youtubeError = error.error as YouTubeApiErrorResponse;
      if (youtubeError.error) {
        youtubeError.error.errors.forEach ((err, index) => {
          console.error(`YouTube Api Error (# ${index + 1}): domain=${err.domain}; message=${err.message}; reason=${err.reason}`);
        });
        console.error('YouTubeApiError errors object', youtubeError.error.errors);
      } else {
        console.error('ErrorResponse error object', error.error);
      }
    }
    // Call super() otherwise error gets swallowed.
    // This triggers logging by the Angular error handler.
    super.handleError(error);
 }

}
