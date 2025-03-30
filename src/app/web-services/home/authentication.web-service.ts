'use client';

import { Endpoints } from '@/app/api/endpoints';
import { UserDto } from '@/definitions/user.definition';

export async function loginService(dto: UserDto) {
  const response = await fetch(Endpoints.authentication.login, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  const data = await response.json();
  sessionStorage.setItem('userToken', data.token);
}

export async function registerService(dto: UserDto) {
  const response = await fetch(Endpoints.authentication.register, {
    method: 'POST',
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  const data = await response.json();
  sessionStorage.setItem('userToken', data.token);
}