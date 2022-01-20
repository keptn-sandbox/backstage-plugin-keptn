import { KepntApi } from './KepntApi';
import { DiscoveryApi } from '@backstage/core-plugin-api';
export declare class KeptnClient implements KepntApi {
    discoveryApi: DiscoveryApi;
    constructor({ discoveryApi }: {
        discoveryApi: DiscoveryApi;
    });
    private getKeptn;
    private postKeptnApi;
    getMetadata(): Promise<any | undefined>;
    getProject(projectId: string): Promise<any | undefined>;
    getServiceStates(projectId: string): Promise<any | undefined>;
    getSequence(projectId: string, params: any): Promise<any | undefined>;
    getEvent(params: any): Promise<any | undefined>;
    postEvent(params: any, body: any): Promise<any | undefined>;
}
