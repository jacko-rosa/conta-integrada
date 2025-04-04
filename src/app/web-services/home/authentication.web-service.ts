'use client';

import { Endpoints } from '@/app/api/endpoints';
import { UserDto } from '@/definitions/user.definition';
import { AUTHORIZATION } from '@/utils/constants';

export async function loginService(dto: UserDto) {
  const response = await fetch(Endpoints.authentication.login.path, {
    method: Endpoints.authentication.login.methods.POST,
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  const data = await response.json();
  sessionStorage.setItem(AUTHORIZATION, data.token);
}

export async function registerService(dto: UserDto) {
  const response = await fetch(Endpoints.authentication.register.path, {
    method: Endpoints.authentication.register.methods.POST,
    body: JSON.stringify(dto),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw { status: response.status, message: errorData.message };
  }
  const data = await response.json();
  sessionStorage.setItem(AUTHORIZATION, data.token);
}