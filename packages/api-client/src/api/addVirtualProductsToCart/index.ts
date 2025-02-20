import { FetchResult } from '@apollo/client/core';
import { CustomQuery } from '@vue-storefront/core';
import type { Context } from '../../types/context';
import type { CustomHeaders } from '../../types/API';
import {
  AddVirtualProductsToCartInput,
  AddVirtualProductsToCartMutation,
  AddVirtualProductsToCartMutationVariables,
} from '../../types/GraphQL';
import addVirtualProductsToCartMutation from './addVirtualProductsToCart';
import getHeaders from '../getHeaders';

/**
 * Adds a set of virtual products to a specified cart
 * @param context VSF Context
 * @param input ID of the cart and products to add
 * @param customQuery custom GraphQL query that extends the default one
 * @param customHeaders (optional) - custom headers that extends the default headers
 */
export default async function addVirtualProductsToCart(
  context: Context,
  input: AddVirtualProductsToCartInput,
  customQuery: CustomQuery = { addVirtualProductsToCart: 'addVirtualProductsToCart' },
  customHeaders: CustomHeaders = {},
): Promise<FetchResult<AddVirtualProductsToCartMutation>> {
  const { addVirtualProductsToCart: addVirtualProductsToCartGQL } = context.extendQuery(
    customQuery,
    {
      addVirtualProductsToCart: {
        query: addVirtualProductsToCartMutation,
        variables: { input },
      },
    },
  );
  return context.client.mutate<AddVirtualProductsToCartMutation, AddVirtualProductsToCartMutationVariables>({
    mutation: addVirtualProductsToCartGQL.query,
    variables: addVirtualProductsToCartGQL.variables,
    context: {
      headers: getHeaders(context, customHeaders),
    },
  });
}
