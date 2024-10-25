'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { IProduct } from '@/entities/product';
import { ReviewCard } from '@/entities/review';
import { CreateReviewButton } from '@/features/review';
import MasterCard from '@/shared/assets/icons/master-card.svg';
import Mir from '@/shared/assets/icons/mir.svg';
import Qiwi from '@/shared/assets/icons/qiwi.svg';
import GradeIcon from '@/shared/assets/icons/star.svg';
import TBank from '@/shared/assets/icons/t-bank_logo.svg';
import Visa from '@/shared/assets/icons/visa.svg';
import { API_URL } from '@/shared/consts';

import styles from './ProductTabs.module.scss';

const tabs = ['Описание', 'Параметры', 'Отзывы', 'Гаранития', 'Оплата', 'Доставка'];

interface IProductTabsProps {
    product: IProduct;
}

export const ProductTabs: FC<IProductTabsProps> = ({ product }) => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div className={clsx(styles.productTabs, 'container')}>
            <Swiper slidesPerView={'auto'} spaceBetween={18} className={clsx(styles.tabs)}>
                {tabs.map((tab, index) => (
                    <SwiperSlide key={index} className={styles.slide}>
                        <div
                            className={clsx(styles.tab, currentTab === index && styles.current)}
                            onClick={() => setCurrentTab(index)}
                        >
                            {tab}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.2,
                    }}
                    className={styles.tabBody}
                >
                    {
                        [
                            <ProductDescription key={'description'} product={product} />,
                            <ProductSpecifications key={'specifications'} product={product} />,
                            <ProductFeedback key={'feedback'} product={product} />,
                            <ProductWarranty key={'warranty'} />,
                            <ProductPayment key={'payment'} />,
                            <ProductDelivery key={'delivery'} />,
                        ][currentTab]
                    }
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const ProductDescription = ({ product }: { product: IProduct }) => {
    return (
        <div className={clsx(styles.productDescription)}>
            {product.descriptions.map((description) => {
                return (
                    <div
                        key={description.id}
                        className={clsx(styles.description, description.type === 'left' && styles.left)}
                    >
                        {description.images && description.images.length > 1 ? (
                            <Swiper
                                spaceBetween={20}
                                pagination={true}
                                modules={[Pagination]}
                                className={styles.productDescriptionSlider}
                            >
                                {description.images.map((image) => {
                                    return (
                                        <SwiperSlide key={image.id}>
                                            <Image
                                                src={`${API_URL}/${image.image}`}
                                                alt={'image'}
                                                width={1280}
                                                height={553}
                                                className={styles.slideImage}
                                            />
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        ) : (
                            <>
                                <div className={styles.descriptionWrap}>
                                    <h2>{description.title}</h2>
                                    <p>{description.description}</p>
                                </div>
                                {!!description.images?.length && (
                                    <Image
                                        src={`${API_URL}/${description.images[0]?.image}`}
                                        alt={'image'}
                                        width={630}
                                        height={450}
                                        className={styles.image}
                                    />
                                )}
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

const ProductSpecifications = ({ product }: { product: IProduct }) => {
    return (
        <div className={styles.specifications}>
            {product.characteristics.map((characteristic) => {
                return (
                    <div key={characteristic.id} className={styles.specification}>
                        <div className={styles.title}>{characteristic.title}</div>
                        <div className={styles.value}>
                            {characteristic.value} {characteristic?.categoryCharacteristic?.measurement}
                        </div>
                    </div>
                );
            })}
            {product.additionalCharacteristics.map((characteristic) => {
                return (
                    <div key={characteristic.id} className={styles.specification}>
                        <div className={styles.title}>{characteristic.title}</div>
                        <div className={styles.value}>{characteristic.value}</div>
                    </div>
                );
            })}
        </div>
    );
};

const ProductFeedback = ({ product }: { product: IProduct }) => {
    return (
        <div className={styles.feedback}>
            <div className={styles.feedbackList}>
                {product.reviews.map((review) => {
                    return <ReviewCard key={review.id} review={review} />;
                })}
            </div>

            <div className={styles.reviewWrap}>
                <div className={styles.gradeWrap}>
                    <GradeIcon />
                    <div>{product.average}</div>
                    <div className={styles.ellipse} />
                    <div>{product.reviews.length} отзыва</div>
                </div>
                <CreateReviewButton productId={product.id} />
            </div>
        </div>
    );
};

const ProductWarranty = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <div>
                    Гарантийный период – это срок, во время которого клиент, обнаружив недостаток товара имеет право
                    потребовать от продавца или изготовителя принять меры по устранению дефекта. Продавец должен
                    устранить недостатки, если не будет доказано, что они возникли вследствие нарушений покупателем
                    правил эксплуатации.
                </div>
                <br />
                <br />
                <h2>С какого момента начинается гарантия?</h2>
                <br />
                <ul>
                    <li>с момента передачи товара потребителю, если в договоре нет уточнения;</li>
                    <li>если нет возможности установить день покупки, то гарантия идёт с момента изготовления;</li>
                    <li>на сезонные товары гарантия идёт с момента начала сезона;</li>
                    <li>при заказе товара из интернет-магазина гарантия начинается со дня доставки.</li>
                </ul>
                <br />
                <br />
                <h2>Обслуживание по гарантии включает в себя:</h2>
                <br />
                <ul>
                    <li>устранение недостатков товара в сертифицированных сервисных центрах;</li>
                    <li>обмен на аналогичный товар без доплаты;</li>
                    <li>обмен на похожий товар с доплатой;</li>
                    <li>возврат товара и перечисление денежных средств на счёт покупателя.</li>
                </ul>
                <br />
                <br />
                <h2>Правила обмена и возврата товара:</h2>
                <br />
                <div>Обмен и возврат продукции надлежащего качества</div>
                <br />
                <ul>
                    <li>Продавец гарантирует, возврат или обмен товара:</li>
                    <li>При покупке в розничном магазине – 14 дней.</li>
                    <li>При покупке в интернет-магазине – 7 дней.</li>
                    <li>
                        товар не поступал в эксплуатацию и имеет товарный вид, находится в упаковке со всеми ярлыками, а
                        также есть документы на приобретение товара;
                    </li>
                    <li>товар не входит в перечень продуктов надлежащего качества, не подлежащих возврату и обмену.</li>
                </ul>
                <br />
                <div>
                    Покупатель имеет право обменять товар надлежащего качества на другое торговое предложение этого
                    товара или другой товар, идентичный по стоимости или на иной товар с доплатой или возвратом разницы
                    в цене.
                </div>
                <br />
                <br />
                <h2>Обмен и возврат продукции ненадлежащего качества</h2>
                <br />
                <div>
                    Если покупатель обнаружил недостатки товара после его приобретения, то он может потребовать замену у
                    продавца. Замена должна быть произведена в течение 7 дней со дня предъявления требования. В случае,
                    если будет назначена экспертиза на соответствие товара указанным нормам, то обмен должен быть
                    произведён в течение 20 дней. Технически сложные товары ненадлежащего качества заменяются товарами
                    той же марки или на аналогичный товар другой марки с перерасчётом стоимости. Возврат производится
                    путем аннулирования договора купли-продажи и возврата суммы в размере стоимости товара.
                </div>
                <br />
                <br />
                <h2>Возврат денежных средств</h2>
                <br />
                <div>
                    Срок возврата денежных средств зависит от вида оплаты, который изначально выбрал покупатель. <br />
                    При наличном расчете возврат денежных средств осуществляется на кассе не позднее через через 10 дней
                    после предъявления покупателем требования о возврате.
                    <br /> Зачисление стоимости товара на карту клиента, если был использован безналичный расчёт,
                    происходит сразу после получения требования от покупателя.
                    <br /> При использовании электронных платёжных систем, возврат осуществляется на электронный счёт в
                    течение 10 календарных дней.
                </div>
            </div>
        </div>
    );
};

const ProductPayment = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <h2>Наличные</h2>
                <br />
                <div>
                    Оплата принимается в российских рублях в нашем магазине или курьером при заказе с доставкой. При
                    получении товара обязательно проверьте его комплектацию, наличие гарантийного талона и чека.
                </div>
                <br />
                <br />
                <h2>Банковской картой</h2>
                <br />
                <div>
                    Вы можете совершить покупку с помощью банковской карты в нашем центре продаж или при доставке нашим
                    курьером. Данный способ расчета не влияет на стоимость товара - комиссия при оплате заказа не
                    взимается.
                </div>
                <br />
                <div className={styles.payments}>
                    <MasterCard />
                    <Visa />
                    <Mir />
                    <Qiwi />
                </div>
                <br />
                <div>
                    Для оплаты (ввода реквизитов Вашей карты) Вы будете перенаправлены на платежный шлюз ПАО СБЕРБАНК.
                    Соединение с платежным шлюзом и передача информации осуществляется в защищенном режиме с
                    использованием протокола шифрования SSL.
                    <br />
                    <br />
                    В случае если Ваш банк поддерживает технологию безопасного проведения интернет-платежей Verified By
                    Visa или MasterCard SecureCode для проведения платежа также может потребоваться ввод специального
                    пароля. Настоящий сайт поддерживает 256-битное шифрование. Конфиденциальность сообщаемой
                    персональной информации обеспечивается ПАО СБЕРБАНК.
                    <br />
                    <br />
                    Введенная информация не будет предоставлена третьим лицам за исключением случаев, предусмотренных
                    законодательством РФ. Проведение платежей по банковским картам осуществляется в строгом соответствии
                    с требованиями платежных систем МИР, Visa Int. и MasterCard Europe Sprl.
                </div>
                <br />
                <br />
                <h2>Безналичный расчет</h2>
                <br />
                <div>
                    Данный способ оплаты возможен только при 100% предоплате.
                    <br />
                    <br />
                    После оформления заказа, на ваш электронный адрес придет уведомление с реквизитами и вложенной
                    квитанцией.
                    <br />
                    <br />
                    Как только денежные средства поступят на наш расчетный счет, выбранные вами при создании Заказа
                    товары будут зарезервированы, и начнется его комплектация.
                    <br />
                    <br />
                    Для юридических лиц единственная форма оплаты - перевод на расчетный счет.
                    <br />
                    <br />
                    После подтверждения заказа на e-mail будет выслано уведомление и вложенный счет на оплату со всеми
                    реквизитами для осуществления перевода, необходимыми подписями и печатью.
                    <br />
                    <br />
                    ВНИМАНИЕ! После оплаты товаров любые поправки в заказе, меняющие его стоимость, невозможны.
                </div>
                <br />
                <br />
                <h2>Кредиты и рассрочки</h2>
                <br />
                <TBank />
                <br />
                <br />
                <div>
                    Оформить кредит на сайте — быстро и просто. При оформлении заказа в корзине укажите способ оплаты
                    «Купить в кредит» или сообщите об этом менеджеру, когда с вами свяжутся для уточнения деталей
                    заказа, если вы воспользовались формой «Купить в один клик»
                    <br />
                    <br />
                    После оформления заказа с вами свяжется наш менеджер для заполнения анкеты. Заявка отправляется в
                    банк и рассматривается в течение 2 минут. Также вы можете заполнить анкету самостоятельно, в таком
                    случае, после подтверждения заказа, ссылка на заполнение будет выслана вам в смс.
                    <br />
                    <br />
                    Кредит предоставляется АО «Т-Банк» на следующих условиях:
                    <br />
                    <br />
                    Заемщик - гражданин РФ в возрасте от 18 до 70 лет
                    <br />
                    <br />
                    Сумма - от 3 000 до 200 000 р
                    <br />
                    <br />
                    Срок кредитования от 3 до 24 месяцев
                    <br />
                    <br />
                    Процентная ставка рассчитывается индивидуально
                    <br />
                    <br />
                    Ваш ТПВ и размер ежемесячного платежа будет определен по результатам рассмотрения заявки. Подробнее
                    на сайте www.tbank.ru.
                    <br />
                    <br />
                    АО «Т-Банк», ООО «Микрофинансовая компания «Т-Финанс».
                </div>
            </div>
        </div>
    );
};

const ProductDelivery = () => {
    return (
        <div className={styles.content}>
            <div className={styles.wrap}>
                <h2>Экспресс-доставка курьером</h2>
                <br />
                <div>
                    Быстрая и надёжная доставка по городам России и в страны дальнего зарубежья. Данная услуга
                    осуществляется в режимах: «дверь-дверь», «окно-дверь», «дверь-окно», «окно-окно». Экспресс-доставка
                    от ФГУП ГЦСС имеет ряд дополнительных преимуществ: к Вашим услугам широкая региональная сеть - 77
                    Управлений и 135 отделений спецсвязи по всей России, которая позволяет обслуживать более 2500
                    городов.
                </div>
                <br />
                <div>Преимущества:</div>
                <br />
                <ul>
                    <li>основной объем отправлений доставляется за 1-2 дня по всей России, включая Крым;</li>
                    <li>
                        к отправке принимаются любые виды вложения (документы, памятные монеты, ценные бумаги, ювелирные
                        изделия, произведения искусства всех видов, культурные ценности*, предметы антиквариата,
                        медикаменты, биологические материалы, опасные грузы**);
                    </li>
                    <li>для перевозки особых видов грузов используется собственный специализированный транспорт;</li>
                    <li>
                        Вы можете выбрать тариф или режим доставки; услуга может быть оплачена наличными и безналичным
                        способами (при наличии договора с предприятием).
                    </li>
                </ul>
                <br />
                <br />
                <div>Вы можете заказать курьера любым удобным способом:</div>
                <br />
                <ul>
                    <li>по телефону;</li>
                    <li>электронной почте;</li>
                    <li>через Личный кабинет.</li>
                </ul>
                <br />
                <br />
                <br />
                <div>
                    * Если они не требуют особых условий транспортировки ** К доставке принимаются опасные грузы, не
                    требующие оформления разрешений (имеются ограничения, уточняйте у специалистов)»
                </div>
            </div>
        </div>
    );
};
