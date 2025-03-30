'use client';

import { Endpoints } from '@/app/api/endpoints';
import { UserDto } from '@/definitions/user.definition';

export async function loginService(dto: UserDto) {
  console.log('loginService');
  console.log('router');
  const response = await fetch(Endpoints.authentication.login, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  console.log('response: ', response);
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  const data = await response.json();
  sessionStorage.setItem('userToken', data.token);

}