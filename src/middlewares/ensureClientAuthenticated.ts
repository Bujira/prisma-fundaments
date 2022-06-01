import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureClientAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const headerAuth = request.headers.authorization

  if (!headerAuth) {
    throw new AppError('Token is missing!', 401)
  }

  const [, token] = headerAuth.split(' ')

  try {
    const { sub } = verify(token, String(process.env.TOKEN_CLIENT_SECRET_KEY)) as IPayload

    request.clientId = sub

    return next()
  } catch (error) {
    throw new AppError('Invalid or expired token!', 401)
  }
}