export interface IFilter {
    id: number;
    title: string;
    values: string[];
    filterType: TFilterType;
}

export type TFilterType =
    | 'range'
    | 'list'
    | 'list-multiple'
    | 'radio'
    | 'buttons'
    | 'checkboxes'
    | 'switcher'
    | 'colors'
    | 'price';
