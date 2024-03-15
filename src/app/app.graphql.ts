import { ApplicationConfig, inject } from '@angular/core';

// * Apollo.
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

// * Env.
import { environment } from '@env/environment';

export function apolloOptionsFactory(): ApolloClientOptions<unknown> {
	const httpLink: HttpLink = inject(HttpLink);
	return { link: httpLink.create({ uri: environment.api }), cache: new InMemoryCache() };
}

export const GRAPHQL_PROVIDER: ApplicationConfig['providers'] = [
	Apollo,
	{ provide: APOLLO_OPTIONS, useFactory: apolloOptionsFactory }
];
