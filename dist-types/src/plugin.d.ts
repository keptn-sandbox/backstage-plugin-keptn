/// <reference types="react" />
export declare const keptnPlugin: import("@backstage/core-plugin-api").BackstagePlugin<{}, {}>;
export declare const EntityKeptnProjectCard: ({ variant }: {
    entity?: import("@backstage/catalog-model").Entity | undefined;
    variant?: import("@backstage/core-components").InfoCardVariants | undefined;
}) => JSX.Element;
export declare const EntityKeptnServiceCard: ({ variant }: {
    entity?: import("@backstage/catalog-model").Entity | undefined;
    variant?: import("@backstage/core-components").InfoCardVariants | undefined;
}) => JSX.Element;
export declare const EntityKeptnContent: () => JSX.Element;
export declare const isKeptnProjectAvailable: (entity: import("@backstage/catalog-model").Entity) => boolean;
export declare const isKeptnServiceAvailable: (entity: import("@backstage/catalog-model").Entity) => boolean;
