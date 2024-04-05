import { IBuyer, ILibraries } from '../interfaces/libraries.interface';

export type TLibrary = keyof ILibraries;
export type TCollection = IBuyer;
export type TMiniature = keyof TCollection;
