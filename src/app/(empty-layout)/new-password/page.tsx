import { NewPasswordPage } from './NewPasswordPage';

interface IProps {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ searchParams }: IProps) {
    console.log(searchParams);

    return <NewPasswordPage />;
}
