import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { useSessionStore } from '@/entities/session';
import { Button, Modal } from '@/shared/ui';

import { CreateReviewForm } from '../CreateReviewForm';

interface ICreateReviewButtonProps {
    productId: number;
}

export const CreateReviewButton: FC<ICreateReviewButtonProps> = ({ productId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated } = useSessionStore();

    const handleClick = () => {
        isAuthenticated ? setIsOpen(true) : router.push('?authentication=signin', { scroll: false });
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
