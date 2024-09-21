import { CategoryPage } from './CategoryPage';

export default function Page({ params }: { params: { slug: string } }) {
    return <CategoryPage slug={params.slug} />;
}
