/// <reference types="react" />
import * as _backstage_core_components from '@backstage/core-components';
import * as _backstage_catalog_model from '@backstage/catalog-model';

declare const EntityKeptnProjectCard: ({ variant }: {
    entity?: _backstage_catalog_model.Entity | undefined;
    variant?: _backstage_core_components.InfoCardVariants | undefined;
}) => JSX.Element;
declare const EntityKeptnServiceCard: ({ variant }: {
    entity?: _backstage_catalog_model.Entity | undefined;
    variant?: _backstage_core_components.InfoCardVariants | undefined;
}) => JSX.Element;
declare const EntityKeptnContent: () => JSX.Element;
declare const isKeptnProjectAvailable: (entity: _backstage_catalog_model.Entity) => boolean;
declare const isKeptnServiceAvailable: (entity: _backstage_catalog_model.Entity) => boolean;

export { EntityKeptnContent, EntityKeptnProjectCard, EntityKeptnServiceCard, isKeptnProjectAvailable, isKeptnServiceAvailable };
