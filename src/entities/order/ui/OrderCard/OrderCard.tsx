import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import ArrowIcon from '@/shared/assets/icons/arrow_down.svg';
import FileIcon from '@/shared/assets/icons/file.svg';
import { Button, Separator } from '@/shared/ui';

import styles from './OrderCard.module.scss';

export const OrderCard = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <article className={clsx(styles.orderCard, isOpen && styles.open)}>
            <div className={styles.header} onClick={() => setIsOpen((prev) => !prev)}>
                <div className={styles.titleWrap}>
                    <div className={styles.title}>Заказ № 9000362</div>
                    <div className={styles.status}>Передано в доставку</div>
                </div>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ArrowIcon />
                </motion.div>
            </div>
            {isOpen ? (
                <div className={styles.body}>
                    <div className={styles.info}>
                        <div className={styles.count}>
                            Всего: 3 товара <div className={styles.ellipse} />2 489 г
                        </div>
                        <Button variant={'outline'} className={styles.button}>
                            <FileIcon />
                            Документы
                        </Button>
                        <div className={styles.price}>190 770 ₽</div>
                    </div>
                    <div className={styles.products}>
                        <div className={styles.product}>
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={130}
                                height={114}
                                alt={'product'}
                                className={styles.image}
                            />
                            <div className={styles.productInfo}>
                                <div className={styles.productNameWrap}>
                                    <div className={styles.productName}>Набор BETAFPV Cetus Pro FPV Kit (RTF)</div>
                                    <div className={styles.productPrice}>29 990 ₽</div>
                                </div>
                                <div className={styles.productCharacteristics}>
                                    <div>Комплект</div>
                                    <div>Артикул: 274916</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={130}
                                height={114}
                                alt={'product'}
                                className={styles.image}
                            />
                            <div className={styles.productInfo}>
                                <div className={styles.productNameWrap}>
                                    <div className={styles.productName}>Набор BETAFPV Cetus Pro FPV Kit (RTF)</div>
                                    <div className={styles.productPrice}>29 990 ₽</div>
                                </div>
                                <div className={styles.productCharacteristics}>
                                    <div>Комплект</div>
                                    <div>Артикул: 274916</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.product}>
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={130}
                                height={114}
                                alt={'product'}
                                className={styles.image}
                            />
                            <div className={styles.productInfo}>
                                <div className={styles.productNameWrap}>
                                    <div className={styles.productName}>Набор BETAFPV Cetus Pro FPV Kit (RTF)</div>
                                    <div className={styles.productPrice}>29 990 ₽</div>
                                </div>
                                <div className={styles.productCharacteristics}>
                                    <div>Комплект</div>
                                    <div>Артикул: 274916</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.delivery}>
                        <div className={styles.address}>
                            <div>Доставка курьером</div>
                            <span>ул. Проспект мира 3, д. 1, к2</span>
                            <span>Подъезд 5, Этаж 10, домофон 310</span>
                        </div>
                        <div className={styles.contacts}>
                            <span>+7 (495) 000 00 00</span>
                            <span>example@mail.ru</span>
                        </div>
                        <Button variant={'outline'} className={styles.support}>
                            Поддержка
                        </Button>
                    </div>
                </div>
            ) : (
                <>
                    <Separator />
                    <div className={styles.body}>
                        <div className={styles.info}>
                            <div className={styles.count}>
                                Всего: 3 товара <div className={styles.ellipse} />2 489 г
                            </div>
                            <div className={styles.price}>190 770 ₽</div>
                            <Button variant={'outline'} className={styles.button}>
                                <FileIcon />
                                Документы
                            </Button>
                        </div>
                        <div className={styles.products}>
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={164}
                                height={144}
                                alt={'product'}
                            />
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={164}
                                height={144}
                                alt={'product'}
                            />
                            <Image
                                src={
                                    'https://s3-alpha-sig.figma.com/img/a413/a66e/f72f7efed8abcd0d13c257a73f83a86a?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Yh8NrdwEpmaDcpZ3myBQAmth~AEgbZ~gmNjN7ssQW8X0AEoOC01kpJ7033C~sAorgeQBDaFO2vil19lW9hyd997X7tSyZdVEvHyX7~v39M4ouJHLqLtlbIY2YUNYQ0srdGhJBjVBuJzZnK5Kv6Rr~IHbhGrwls11O5L7QK6-EGRv0Aj4Cgd7gUqDDqgFLRIcGOJ1KmT4J~e5eCduhsvRfSzP-sX5R5D-Yhx8gN3EZfr8N-To~altuiZs9UtWw6VyjyEa82WOrteVcQQ4uiN7~Mw~vBJ0XHUOLDx2B7E~~G~-UNq4GQ87Su4xIlvnWBRW2XU-cKm0MBC9X-k9VXTBpA__'
                                }
                                width={164}
                                height={144}
                                alt={'product'}
                            />
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};
