import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';

import { AuthProvider, useAuth } from './auth';

jest.mock('expo-auth-session', () => {
  return {
    startAsync: () => {
      return {
        type: 'success',
        params: {
          access_token: 'google-token',
        },
      };
    },
  };
});

describe('Hooks/Auth', () => {
  it('should be able to sign in with Google account', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 'userInfo.id',
            name: 'userInfo.name',
            email: 'userInfo.email',
            photo: 'userInfo.photo',
            locale: 'userInfo.locale',
            verified_email: 'userInfo.verified_email',
          }),
      })
    ) as jest.Mock;

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).toBeTruthy();
  });
});
