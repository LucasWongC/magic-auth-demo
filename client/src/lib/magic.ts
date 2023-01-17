import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const publicKey = process.env.REACT_APP_MAGIC_PUBLISHABLE_KEY || ""
export const magic = new Magic(publicKey, {
  extensions: [new OAuthExtension()],
}) as any;
