import _ from '@lodash';
import FuseUtils from '@fuse/utils';
import { CategoryType, CategoriesType } from '../../app/main/category/types/CategoryType';
import mockApi from '../mock-api.json';
import mock from '../mock';
import { Params } from '../ExtendedMockAdapter';

let productsDB = mockApi.components.examples.ecommerce_products.value as CategoriesType;


mock.onGet('/api/ecommerce/categories').reply(() => {
    return [200, productsDB];
});

mock.onPost('/api/ecommerce/categories').reply(({ data }) => {
    const newProduct = { id: FuseUtils.generateGUID(), ...JSON.parse(data as string) } as CategoryType;

    productsDB.push(newProduct);

    return [200, newProduct];
});

mock.onDelete('/api/ecommerce/categories').reply(({ data }) => {
    const ids = JSON.parse(data as string) as string[];

    productsDB = productsDB.filter((item) => ids.includes(item.id));

    return [200, productsDB];
});

mock.onGet('/api/ecommerce/categories/:id').reply((config) => {
    const { id } = config.params as Params;

    return [200, _.find(productsDB, { id })];
});

mock.onPut('/api/ecommerce/categories/:id').reply((config) => {
    const { id } = config.params as Params;

    _.assign(_.find(productsDB, { id }), JSON.parse(config.data as string));

    return [200, _.find(productsDB, { id })];
});

mock.onDelete('/api/ecommerce/categories/:id').reply((config) => {
    const { id } = config.params as Params;

    _.remove(productsDB, { id });

    return [200, id];
});






