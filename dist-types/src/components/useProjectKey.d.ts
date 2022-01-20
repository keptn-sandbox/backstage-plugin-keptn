import { Entity } from '@backstage/catalog-model';
export declare const KEPTN_PROJECT_KEY_ANNOTATION = "keptn.sh/project";
export declare const KEPTN_SERVICE_KEY_ANNOTATION = "keptn.sh/service";
export declare const isProjectAvailable: (entity: Entity) => boolean;
export declare const isServiceAvailable: (entity: Entity) => boolean;
export declare const useProjectKey: (entity: Entity) => string;
export declare const useServiceKey: (entity: Entity) => string;
