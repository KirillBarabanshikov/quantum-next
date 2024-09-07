import SearchIcon from '@/shared/assets/icons/search.svg';

import styles from './Search.module.scss';

export const Search = () => {
    return (
        <div className={styles.search}>
            <input type={'text'} placeholder={'Поиск'} className={styles.input} />
            <SearchIcon className={styles.icon} />
        </div>
    );
};
