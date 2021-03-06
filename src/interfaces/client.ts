import Observable from 'zen-observable-ts';

import { ICache } from './cache';
import { IEventFn } from './events';
import { IExchangeResult } from './exchange';
import { IQuery } from './query';

export interface IClient {
  cache: ICache;
  cacheWithEvents: ICache;

  // Event handler methods
  dispatch: IEventFn;
  subscribe(callback: IEventFn): () => void;

  // Execute methods
  executeSubscription$: (
    subscriptionObject: IQuery
  ) => Observable<IExchangeResult>;
  executeQuery$(
    queryObject: IQuery,
    skipCache: boolean
  ): Observable<IExchangeResult>;
  executeQuery(
    queryObject: IQuery,
    skipCache: boolean
  ): Promise<IExchangeResult>;
  executeMutation$(mutationObject: IQuery): Observable<IExchangeResult['data']>;
  executeMutation(mutationObject: IQuery): Promise<IExchangeResult['data']>;

  // Batched cache operations that trigger events
  invalidateQuery(queryObject: IQuery): Promise<void>;
  refreshAllFromCache(): void;
  deleteCacheKeys(keys: string[]): Promise<void>;
  updateCacheEntry(key: string, value: any): Promise<void>;
}
