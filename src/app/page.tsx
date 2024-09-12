import {
    Advantages,
    CategoriesList,
    MainBanner,
    NewCollectionBanner,
    ProductsCarousel,
    QuestionBanner,
} from '@/widgets';

import styles from './page.module.scss';

export default function Home() {
    return (
        <div className={styles.homePage}>
            <div>
                <MainBanner className={styles.mainBanner} />
                <CategoriesList className={styles.categoriesList} />
            </div>
            <ProductsCarousel title={'Новинки'} className={styles.new} />
            <ProductsCarousel title={'Популярное'} className={styles.popular} />
            <NewCollectionBanner className={styles.newCollectionBanner} />
            <ProductsCarousel title={'Аккумуляторы'} className={styles.accumulators} />
            <Advantages className={styles.advantages} />
            <QuestionBanner />
        </div>
    );
}
