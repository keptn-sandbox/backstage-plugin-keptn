/// <reference types="react" />
import { Entity } from '@backstage/catalog-model';
import { InfoCardVariants } from '@backstage/core-components';
export declare const ProjectCard: ({ variant }: {
    entity?: Entity | undefined;
    variant?: InfoCardVariants | undefined;
}) => JSX.Element;
