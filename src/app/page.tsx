import {
    Advantages,
    CategoriesList,
    MainBanner,
    NewCollectionBanner,
    ProductsCarousel,
    QuestionBanner,
} from '@/widgets';

import styles from './HomePage.module.scss';

export default function Home() {
    return (
        <div className={styles.homePage}>
            <MainBanner className={styles.mainBanner} />
            <CategoriesList className={styles.categoriesList} />
            <ProductsCarousel title={'Новинки'} className={styles.new} />
            <ProductsCarousel title={'Популярное'} className={styles.popular} />
            <NewCollectionBanner className={styles.newCollectionBanner} />
            <ProductsCarousel title={'Аккумуляторы'} className={styles.accumulators} />
            <Advantages className={styles.advantages} />
            <QuestionBanner />
        </div>
    );
}
