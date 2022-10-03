import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';
import Spinner from '../../components/spinner/spinner.component';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoriesContext } from '../../contexts/categories.context';

import { CategoryContainer, Title } from './category.styles';

const GET_Category = gql`
  query ($title: String!) {
    getCollectionByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const SET_Category = gql`
  mutation ($category: Category!) {
    addCategory(category: $category) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

const Category = () => {
  const { category } = useParams();
  // const { loading, error, data } = useQuery(GET_Category, {
  //   variables: {
  //     title: category,
  //   },
  // });

  const [addCategory, { loading, error, data }] = useMutation(SET_Category);

  addCategory({ variables: { category: categoryObject } });

  useEffect(() => {
    if (data) {
      const {
        getCollectionByTitle: { items },
      } = data;
      setProducts(items);
    }
  }, [category, data]);
  const [products, setProducts] = useState(categoriesMap[category]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Title>{category.toUpperCase()}</Title>
          <CategoryContainer>
            {products &&
              products.map((product) => <ProductCard key={product.id} product={product} />)}
          </CategoryContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Category;
