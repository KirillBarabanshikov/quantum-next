import React from 'react';

import { ProductPage } from './ProductPage';

export default function Page({ params }: { params: { slug: string } }) {
    return <ProductPage slug={params.slug} />;
}
