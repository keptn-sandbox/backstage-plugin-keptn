/// <reference types="react" />
import { Entity } from '@backstage/catalog-model';
import { InfoCardVariants } from '@backstage/core-components';
export declare const ServiceCard: ({ variant }: {
    entity?: Entity | undefined;
    variant?: InfoCardVariants | undefined;
}) => JSX.Element;
