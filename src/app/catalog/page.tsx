import { CategoriesList } from '@/widgets';

export default function Page() {
    return (
        <section>
            <div className={'container'}>
                <h1 className={'title'}>Каталог</h1>
            </div>
            <CategoriesList />
        </section>
    );
}
