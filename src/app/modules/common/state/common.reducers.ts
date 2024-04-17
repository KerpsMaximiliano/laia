import { createReducer, on } from '@ngrx/store';

// * STATE - Const.
import { COMMON_STATE } from './common.state';

// * Consts.
// * COMMON.
import { AUX_COLLECTION } from '@common/constants/collection.const';
import { LIBRARIES_INFORMATION } from '@common/constants/library.const';
// * CORE.
import { COMPLETE, FAILED, LOADED, LOADING, UPDATING } from '@consts/load.const';

// * Functions.
import { transformStyle } from '@common/functions/util.function';

// * Interfaces.
import { ICollection } from '@common/interfaces/collection.interface';
import { ILibraries } from '@common/interfaces/libraries.interface';
// * Responses.
import { IgLibraryResponse } from '@common/res/library-res.interface';

// * Sorts.
import { TMiniature } from '@common/sorts/common.sort';

// * Actions.
import {
	COLLECTION_CREATE,
	COLLECTION_CREATED,
	COLLECTION_CREATE_REF,
	COLLECTION_DELETE,
	COLLECTION_DELETED,
	COLLECTION_ELEMENTS_LOAD,
	COLLECTION_ELEMENTS_LOADED,
	COLLECTION_EXPANDED,
	COLLECTION_MENU_LOAD,
	COLLECTION_MENU_LOADED,
	COLLECTION_MINIATURES_LOAD,
	COLLECTION_MINIATURES_LOADED,
	COLLECTION_MINIATURES_SELECT,
	COLLECTION_MINIATURES_UPDATE,
	COLLECTION_MINIATURES_UPDATED,
	COLLECTION_RENAME,
	COLLECTION_RENAMED,
	COLLECTION_VIEW_LOAD,
	COLLECTION_VIEW_LOADED,
	LIBRARY_MENU_LOAD,
	LIBRARY_MENU_LOADED,
	LIBRARY_MINIATURES_LOAD,
	LIBRARY_MINIATURES_LOADED,
	LIBRARY_MINIATURES_UPDATE,
	LIBRARY_MINIATURES_UPDATED,
	LIBRARY_MINIATURE_SELECT,
	LIBRARY_RENAME,
	LIBRARY_RENAMED,
	LIBRARY_SELECT_ELEMENT,
	LIBRARY_VIEW_LOAD,
	LIBRARY_VIEW_LOADED
} from './common.actions';

export const COMMON_REDUCERS = createReducer(
	// * INITIAL STATE.
	COMMON_STATE,
	// * LIBRARY VIEW LOAD.
	on(LIBRARY_VIEW_LOAD, (state): ILibraries => state),
	// * LIBRARY VIEW LOADED.
	on(
		LIBRARY_VIEW_LOADED,
		(state, { tLibrary, library, res }): ILibraries => ({
			...state,
			[tLibrary]: {
				...state[tLibrary],
				information:
					state[tLibrary].information.status === COMPLETE
						? state[tLibrary].information
						: { ...state[tLibrary].information, status: COMPLETE, id: library, title: res.title },
				view: {
					status: COMPLETE,
					collections: res.collections.map((collection: IgLibraryResponse['collections'][number]) => {
						const COLLECTION: ICollection = {
							...AUX_COLLECTION,
							information: {
								status: COMPLETE,
								id: collection.id,
								title: collection.title,
								open: false
							},
							view: {
								status: LOADED,
								elements: collection.items,
								button: LIBRARIES_INFORMATION[tLibrary].collection.view,
								count: collection.count,
								footer: LIBRARIES_INFORMATION[tLibrary].collection.footer
							},
							menu: {
								...AUX_COLLECTION.menu,
								status: LOADED,
								button: LIBRARIES_INFORMATION[tLibrary].collection.menu
							},
							miniatures: {
								...AUX_COLLECTION.miniatures,
								status: LOADED,
								header: collection.miniatureHeader,
								title: collection.miniatureTitle,
								subtitle: collection.miniatureSubtitle,
								style: transformStyle(collection.miniatureHeader, collection.miniatureTitle, collection.miniatureSubtitle)
							}
						};

						if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return COLLECTION;

						const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection.id);

						if (INDEX === -1) return COLLECTION;

						return state[tLibrary].view.collections[INDEX];
					}),
					button: LIBRARIES_INFORMATION[tLibrary].library.view,
					count: res.count,
					footer: LIBRARIES_INFORMATION[tLibrary].library.footer
				},
				menu:
					state[tLibrary].menu.status === COMPLETE
						? state[tLibrary].menu
						: { ...state[tLibrary].menu, status: LOADED, button: LIBRARIES_INFORMATION[tLibrary].library.menu }
			}
		})
	),
	// * LIBRARY MENU LOAD.
	on(LIBRARY_MENU_LOAD, (state): ILibraries => state),
	// * LIBRARY MENU LOADED.
	on(
		LIBRARY_MENU_LOADED,
		(state, { tLibrary, library, res }): ILibraries => ({
			...state,
			[tLibrary]: {
				...state[tLibrary],
				information:
					state[tLibrary].information.status === COMPLETE
						? state[tLibrary].information
						: { ...state[tLibrary].information, status: COMPLETE, id: library, title: res.gLibraryConf.title },
				menu: {
					status: COMPLETE,
					button:
						state[tLibrary].menu.status === COMPLETE || state[tLibrary].menu.status === LOADED
							? state[tLibrary].menu.button
							: LIBRARIES_INFORMATION[tLibrary].library.menu,
					default: res.gLibraryConf.conf
				}
			}
		})
	),
	// * LIBRARY RENAME.
	on(
		LIBRARY_RENAME,
		(state, { tLibrary }): ILibraries => ({
			...state,
			[tLibrary]: { ...state[tLibrary], information: { ...state[tLibrary].information, status: UPDATING } }
		})
	),
	// * LIBRARY RENAMED.
	on(
		LIBRARY_RENAMED,
		(state, { tLibrary, title, status }): ILibraries => ({
			...state,
			[tLibrary]: {
				...state[tLibrary],
				information: {
					...state[tLibrary].information,
					status: status === 1 ? COMPLETE : FAILED,
					title: status === 1 ? title : state[tLibrary].information.title
				}
			}
		})
	),
	// * LIBRARY MINIATURES LOAD.
	on(
		LIBRARY_MINIATURES_LOAD,
		(state, { tLibrary }): ILibraries => ({
			...state,
			[tLibrary]: { ...state[tLibrary], miniatures: { ...state[tLibrary].miniatures, status: LOADING } }
		})
	),
	// * LIBRARY MINIATURES LOADED.
	on(
		LIBRARY_MINIATURES_LOADED,
		(state, { tLibrary, res }): ILibraries => ({
			...state,
			[tLibrary]: {
				...state[tLibrary],
				miniatures: {
					status: COMPLETE,
					props: res.gLibraryMiniatures.miniatureProps,
					header: res.gLibraryMiniatures.miniatureHeader,
					title: res.gLibraryMiniatures.miniatureTitle,
					subtitle: res.gLibraryMiniatures.miniatureSubtitle
				}
			}
		})
	),
	// * LIBRARY MINIATURES UPDATE.
	on(
		LIBRARY_MINIATURES_UPDATE,
		(state, { tLibrary }): ILibraries => ({
			...state,
			[tLibrary]: { ...state[tLibrary], miniatures: { ...state[tLibrary].miniatures, status: UPDATING } }
		})
	),
	// * LIBRARY MINIATURES UPDATED.
	on(LIBRARY_MINIATURES_UPDATED, (state, { tLibrary, header, title, subtitle }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				miniatures: {
					...state[tLibrary].miniatures,
					status: COMPLETE
				},
				view: {
					...state[tLibrary].view,
					collections: state[tLibrary].view.collections.map((collection: ICollection) => ({
						...collection,
						miniatures: {
							...state[tLibrary].miniatures,
							status: COMPLETE,
							style: transformStyle(header, title, subtitle)
						}
					}))
				}
			}
		};
	}),
	// * LIBRARY MINIATURE SELECT.
	on(LIBRARY_MINIATURE_SELECT, (state, { tLibrary, mode, prop }): ILibraries => {
		if (mode === 'header' || mode === 'title' || mode === 'subtitle') {
			const MINIATURE: TMiniature[] = [...state[tLibrary].miniatures[mode]];

			if (!Array.isArray(MINIATURE) || MINIATURE.length === 0)
				return { ...state, [tLibrary]: { ...state[tLibrary], miniatures: { ...state[tLibrary].miniatures, [mode]: [prop] } } };

			const SOME: boolean = MINIATURE.some((item: TMiniature) => item === prop);

			if (SOME)
				return {
					...state,
					[tLibrary]: {
						...state[tLibrary],
						miniatures: { ...state[tLibrary].miniatures, [mode]: MINIATURE.filter((item) => item !== prop) }
					}
				};

			MINIATURE.push(prop);

			return { ...state, [tLibrary]: { ...state[tLibrary], miniatures: { ...state[tLibrary].miniatures, [mode]: MINIATURE } } };
		} else {
			return state;
		}
	}),
	// * COLLECTION VIEW LOAD.
	on(COLLECTION_VIEW_LOAD, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [{ ...AUX_COLLECTION, information: { ...AUX_COLLECTION.information, id: collection } }]
					}
				}
			};

		const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection);

		if (INDEX === -1)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [
							...state[tLibrary].view.collections,
							{ ...AUX_COLLECTION, information: { ...AUX_COLLECTION.information, id: collection } }
						]
					}
				}
			};

		return state;
	}),
	// * COLLECTION VIEW LOADED.
	on(COLLECTION_VIEW_LOADED, (state, { tLibrary, collection, res }): ILibraries => {
		const COLLECTION: ICollection = {
			...AUX_COLLECTION,
			information: {
				...AUX_COLLECTION.information,
				status: COMPLETE,
				id: collection,
				title: res.collection.title
			},
			view: {
				...AUX_COLLECTION.view,
				status: COMPLETE,
				elements: res.collection.items,
				button: LIBRARIES_INFORMATION[tLibrary].collection.view,
				count: res.collection.count,
				footer: LIBRARIES_INFORMATION[tLibrary].collection.footer
			},
			miniatures: {
				...AUX_COLLECTION.miniatures,
				status: LOADED,
				header: res.collection.miniatureHeader,
				title: res.collection.miniatureTitle,
				subtitle: res.collection.miniatureSubtitle,
				style: transformStyle(res.collection.miniatureHeader, res.collection.miniatureTitle, res.collection.miniatureSubtitle)
			}
		};

		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [COLLECTION]
					}
				}
			};

		const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection);

		if (INDEX === -1)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [...state[tLibrary].view.collections, COLLECTION]
					}
				}
			};

		COLLECTION.menu = state[tLibrary].view.collections[INDEX].menu;
		COLLECTION.miniatures = { ...COLLECTION.miniatures, props: state[tLibrary].view.collections[INDEX].miniatures.props };
		COLLECTION.filter = state[tLibrary].view.collections[INDEX].filter;

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: state[tLibrary].view.collections.map((item, i) => (i === INDEX ? COLLECTION : item))
				}
			}
		};
	}),
	// * COLLECTION ELEMENTS LOAD.
	on(COLLECTION_ELEMENTS_LOAD, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			view: {
				...COLLECTIONS[INDEX].view,
				status: UPDATING
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION ELEMENTS LOADED.
	on(COLLECTION_ELEMENTS_LOADED, (state, { tLibrary, collection, res }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			view: {
				...COLLECTIONS[INDEX].view,
				status: COMPLETE,
				elements: [...COLLECTIONS[INDEX].view.elements, ...res.items]
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * LIBRARY SELECT ELEMENT.
	on(
		LIBRARY_SELECT_ELEMENT,
		(state, { tLibrary, element }): ILibraries => ({
			...state,
			[tLibrary]: {
				...state[tLibrary],
				information: { ...state[tLibrary].information, selected: state[tLibrary].information.selected === element ? null : element }
			}
		})
	),
	// * COLLECTION MENU LOAD.
	on(COLLECTION_MENU_LOAD, (state): ILibraries => state),
	// * COLLECTION MENU LOADED.
	on(COLLECTION_MENU_LOADED, (state, { tLibrary, collection, detail, res }): ILibraries => {
		const COLLECTION: ICollection = {
			...AUX_COLLECTION,
			information: {
				...AUX_COLLECTION.information,
				status: COMPLETE,
				id: collection,
				title: detail ? res.gCollectionConfiguration.title : AUX_COLLECTION.information.title
			},
			menu: {
				status: COMPLETE,
				button: LIBRARIES_INFORMATION[tLibrary].collection.menu,
				filter: {
					id: res.gCollectionConfiguration.filter.id,
					alias: res.gCollectionConfiguration.filter.alias
				},
				order: {
					type: res.gCollectionConfiguration.ascDesc,
					alias: res.gCollectionConfiguration.order
				},
				default: res.gCollectionConfiguration.conf
			},
			order: {
				...AUX_COLLECTION.order,
				status: LOADED,
				type: res.gCollectionConfiguration.ascDesc
			}
		};

		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [COLLECTION]
					}
				}
			};

		const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection);

		if (INDEX === -1)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [...state[tLibrary].view.collections, COLLECTION]
					}
				}
			};

		COLLECTION.information.open = state[tLibrary].view.collections[INDEX].information.open;
		COLLECTION.information.title = state[tLibrary].view.collections[INDEX].information.title;
		COLLECTION.filter = state[tLibrary].view.collections[INDEX].filter;
		COLLECTION.view = state[tLibrary].view.collections[INDEX].view;
		COLLECTION.miniatures = state[tLibrary].view.collections[INDEX].miniatures;

		if (state[tLibrary].view.collections[INDEX].order.status === COMPLETE) COLLECTION.order = state[tLibrary].view.collections[INDEX].order;

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: state[tLibrary].view.collections.map((item, i) => (i === INDEX ? COLLECTION : item))
				}
			}
		};
	}),
	// * COLLECTION RENAME.
	on(COLLECTION_RENAME, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection);

		if (INDEX === -1) return state;

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: state[tLibrary].view.collections.map((item, i) =>
						i === INDEX ? { ...item, information: { ...item.information, status: UPDATING } } : item
					)
				}
			}
		};
	}),
	// * COLLECTION RENAMED.
	on(COLLECTION_RENAMED, (state, { tLibrary, collection, title, status }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((item) => item.information.id === collection);

		if (INDEX === -1) return state;

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: state[tLibrary].view.collections.map((item, i) =>
						i === INDEX
							? {
									...item,
									information: {
										...item.information,
										status: status === 1 ? COMPLETE : FAILED,
										title: status === 1 ? title : item.information.title
									}
								}
							: item
					)
				}
			}
		};
	}),
	// * COLLECTION CREATE.
	on(
		COLLECTION_CREATE,
		(state, { tLibrary }): ILibraries => ({
			...state,
			[tLibrary]: { ...state[tLibrary], menu: { ...state[tLibrary].menu, status: UPDATING } }
		})
	),
	// * COLLECTION CREATE REF.
	on(COLLECTION_CREATE_REF, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = state[tLibrary].view.collections.map((col: ICollection, i: number) =>
			i === INDEX ? { ...col, menu: { ...col.menu, status: UPDATING } } : col
		);

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION CREATED && COLLECTION CREATED REF.
	on(COLLECTION_CREATED, (state, { tLibrary, res }): ILibraries => {
		const COLLECTION: ICollection = {
			...AUX_COLLECTION,
			information: {
				...AUX_COLLECTION.information,
				id: res.id,
				title: res.title,
				status: COMPLETE
			},
			view: {
				status: LOADED,
				elements: res.items,
				button: LIBRARIES_INFORMATION[tLibrary].collection.view,
				count: res.count,
				footer: LIBRARIES_INFORMATION[tLibrary].collection.footer
			},
			miniatures: {
				...AUX_COLLECTION.miniatures,
				status: LOADED,
				header: res.miniatureHeader,
				title: res.miniatureTitle,
				subtitle: res.miniatureSubtitle,
				style: transformStyle(res.miniatureHeader, res.miniatureTitle, res.miniatureSubtitle)
			}
		};

		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0)
			return { ...state, [tLibrary]: { ...state[tLibrary], view: { ...state[tLibrary].view, collections: [COLLECTION] } } };

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: [...state[tLibrary].view.collections, COLLECTION]
				}
			}
		};
	}),
	// * COLLECTION DELETE.
	on(COLLECTION_DELETE, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = state[tLibrary].view.collections.map((col: ICollection, i: number) =>
			i === INDEX ? { ...col, menu: { ...col.menu, status: UPDATING } } : col
		);

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION DELETED.
	on(COLLECTION_DELETED, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS.splice(INDEX, 1);

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION EXPANDED.
	on(COLLECTION_EXPANDED, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = state[tLibrary].view.collections.map((col: ICollection, i: number) =>
			i === INDEX ? { ...col, information: { ...col.information, open: !col.information.open } } : col
		);

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION MINIATURES LOAD.
	on(COLLECTION_MINIATURES_LOAD, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [{ ...AUX_COLLECTION, information: { ...AUX_COLLECTION.information, id: collection } }]
					}
				}
			};

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1)
			return {
				...state,
				[tLibrary]: {
					...state[tLibrary],
					view: {
						...state[tLibrary].view,
						collections: [{ ...AUX_COLLECTION, information: { ...AUX_COLLECTION.information, id: collection, status: LOADING } }]
					}
				}
			};

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			miniatures: {
				...COLLECTIONS[INDEX].miniatures,
				status: LOADING
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION MINIATURES LOADED.
	on(COLLECTION_MINIATURES_LOADED, (state, { tLibrary, collection, detail, res }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			information: {
				...COLLECTIONS[INDEX].information,
				status: COMPLETE,
				id: collection,
				title: detail ? res.gCollectionMiniature.title : COLLECTIONS[INDEX].information.title
			},
			miniatures: {
				status: COMPLETE,
				props: res.gCollectionMiniature.collectionMiniature.miniatureProps,
				header: res.gCollectionMiniature.collectionMiniature.miniatureHeader,
				title: res.gCollectionMiniature.collectionMiniature.miniatureTitle,
				subtitle: res.gCollectionMiniature.collectionMiniature.miniatureSubtitle,
				style: transformStyle(
					res.gCollectionMiniature.collectionMiniature.miniatureHeader,
					res.gCollectionMiniature.collectionMiniature.miniatureTitle,
					res.gCollectionMiniature.collectionMiniature.miniatureSubtitle
				)
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION MINIATURE SELECT.
	on(COLLECTION_MINIATURES_SELECT, (state, { tLibrary, collection, mode, prop }): ILibraries => {
		if (mode !== 'header' && mode !== 'title' && mode !== 'subtitle') return state;

		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = state[tLibrary].view.collections.map((col: ICollection, i: number) =>
			i === INDEX
				? {
						...col,
						miniatures: {
							...col.miniatures,
							[mode]: col.miniatures[mode].some((item: TMiniature) => item === prop)
								? col.miniatures[mode].filter((item: TMiniature) => item !== prop)
								: [...col.miniatures[mode], prop]
						}
					}
				: col
		);

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION MINIATURES UPDATE.
	on(COLLECTION_MINIATURES_UPDATE, (state, { tLibrary, collection }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			miniatures: {
				...COLLECTIONS[INDEX].miniatures,
				status: UPDATING
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	}),
	// * COLLECTION MINIATURES UPDATED.
	on(COLLECTION_MINIATURES_UPDATED, (state, { tLibrary, collection, header, title, subtitle }): ILibraries => {
		if (!Array.isArray(state[tLibrary].view.collections) || state[tLibrary].view.collections.length === 0) return state;

		const INDEX: number = state[tLibrary].view.collections.findIndex((col: ICollection) => col.information.id === collection);

		if (INDEX === -1) return state;

		const COLLECTIONS: ICollection[] = [...state[tLibrary].view.collections];

		COLLECTIONS[INDEX] = {
			...COLLECTIONS[INDEX],
			miniatures: {
				...COLLECTIONS[INDEX].miniatures,
				status: COMPLETE,
				header,
				title,
				subtitle,
				style: transformStyle(header, title, subtitle)
			}
		};

		return {
			...state,
			[tLibrary]: {
				...state[tLibrary],
				view: {
					...state[tLibrary].view,
					collections: COLLECTIONS
				}
			}
		};
	})
);
