import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { LanguageContext } from '../context/LanguageContext.jsx';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const { t } = useContext(LanguageContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter(item => {
        const categoryMatch = category ? item.category === category : true;
        const subCategoryMatch = subCategory ? item.subCategory === subCategory : true;
        return categoryMatch && subCategoryMatch;
      });
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24 bg-bgLight dark:bg-bgDark text-textLight dark:text-textDark">
      <div className="text-center text-3xl py-2 text-heading dark:text-textDark">
        <Title text1={t('RELATED_PRODUCTS_1')} text2={t('RELATED_PRODUCTS_2')} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={
              // Use first media file preview if exists, else first image, else placeholder
              item.mediaFiles?.[0]?.previewUrl ||
              item.image?.[0] ||
              '/placeholder.png'
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
