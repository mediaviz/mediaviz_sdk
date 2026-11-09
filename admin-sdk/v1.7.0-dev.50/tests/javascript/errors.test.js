// Auto-generated — do not edit
import { ApiError, ValidationError, NotFoundError, RateLimitError, ServerError } from '../../javascript/errors.js';

describe('errors module', () => {
  it('ApiError exists and is a constructor', () => {
    expect(typeof ApiError).toBe('function');
    const e = new ApiError('msg', 500, 'rid', {});
    expect(e instanceof Error).toBe(true);
  });

  it('ValidationError exists and is a constructor', () => {
    expect(typeof ValidationError).toBe('function');
    const e = new ValidationError('msg', 500, 'rid', {});
    expect(e instanceof Error).toBe(true);
  });

  it('NotFoundError exists and is a constructor', () => {
    expect(typeof NotFoundError).toBe('function');
    const e = new NotFoundError('msg', 500, 'rid', {});
    expect(e instanceof Error).toBe(true);
  });

  it('RateLimitError exists and is a constructor', () => {
    expect(typeof RateLimitError).toBe('function');
    const e = new RateLimitError('msg', 500, 'rid', { get: () => null });
    expect(e instanceof Error).toBe(true);
  });

  it('ServerError exists and is a constructor', () => {
    expect(typeof ServerError).toBe('function');
    const e = new ServerError('msg', 500, 'rid', {});
    expect(e instanceof Error).toBe(true);
  });

});
