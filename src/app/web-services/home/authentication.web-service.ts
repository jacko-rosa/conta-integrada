'use client';

import { UserDto } from '@/definitions/user.definition';
import { PayloadToken } from '@/definitions/util.definition';
import { AUTHORIZATION } from '@/utils/constants';
import { Endpoints } from '@/utils/endpoints';
import jwt from 'jsonwebtoken';

const loginService = async (dto: UserDto) => {
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

const registerService = async (dto: UserDto) => {
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

const decodeJwt = (): PayloadToken => {
  const token = sessionStorage.getItem(AUTHORIZATION);
  if (!token) {
    throw new Error('Token not found');
  }
  return jwt.decode(token) as PayloadToken;
}

const getToken = () => {
  return sessionStorage.getItem(AUTHORIZATION);
}

export const AuthenticationWebService = {
  loginService,
  registerService,
  decodeJwt,
  getToken
}