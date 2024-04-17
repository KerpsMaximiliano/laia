// * Interfaces.
import { IBuyer } from '@common/interfaces/elements.interface';
import { ILibraries } from '@common/interfaces/libraries.interface';

// * LIBRARIES.
export type TLibraries = keyof ILibraries;

// * COLLECTIONS.
export type TCollections = IBuyer;
export type TMiniature = keyof TCollections;
export type ICollectionActions = 'BACK' | 'FILTER' | 'MENU' | 'MINIATURES' | 'ORDER';
