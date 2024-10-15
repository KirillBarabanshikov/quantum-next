import { FC, useState } from 'react';

import { Button, Modal } from '@/shared/ui';

import { CreateReviewForm } from '../CreateReviewForm';

interface ICreateReviewButtonProps {
    productId: number;
}

export const CreateReviewButton: FC<ICreateReviewButtonProps> = ({ productId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true);
    };

    return (
        <>
            <Button fullWidth onClick={handleClick}>
                Добавить отзыв
            </Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={'Напишите отзыв о товаре'} maxWidth={596}>
                <CreateReviewForm productId={productId} />
            </Modal>
        </>
    );
};
