import { ErrorHandlerService, ErrorResponse, YouTubeApiErrorResponse } from './error-handler.service';

describe('ErrorHandlerService', () => {

  beforeEach(() => {
  });

  it('should display alert when handleError is invoked', () => {
    const service = new ErrorHandlerService();
    spyOn(window, 'alert');

    const error = {status: 400, statusText: 'Bad something'};

    service.handleError(error as ErrorResponse);

    expect(window.alert).toHaveBeenCalled();
  });

  it('should call console.error 3 times when handleError handles a non-API call error', () => {
    // NOTE: one console.error call is done by the super class
    const service = new ErrorHandlerService();
    spyOn(window, 'alert');
    spyOn(window.console, 'error');
    const error: ErrorResponse = {
      headers: {}, status: 400, statusText: 'Bad something',
      url: 'localhost:4200', message: 'Bad stuff happened',
      ok: false, name: 'Bogus Error',
      error: { } as Event
    };

    service.handleError(error);

    expect(window.console.error).toHaveBeenCalledTimes(3);
  });


  it('should call console.error four times when handleError handles a YouTube API error', () => {
    // NOTE: one console.error call is done by the super class
    const service = new ErrorHandlerService();
    spyOn(window, 'alert');
    spyOn(window.console, 'error');
    const error: ErrorResponse = {
      headers: {}, status: 400, statusText: 'Bad something',
      url: 'localhost:4200', message: 'Bad stuff happened',
      ok: false, name: 'Bogus Error',
      error: { error: {errors: [{domain: 'YouTube', reason: 'No reason', message: 'You did bad things!' }],
            code: 400, message: 'Why me?'}
      }
    };

    service.handleError(error);

    expect(window.console.error).toHaveBeenCalledTimes(4);
  });


});
