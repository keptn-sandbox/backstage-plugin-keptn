export declare const keptnApiRef: import("@backstage/core-plugin-api").ApiRef<KeptnApi>;
export declare type KeptnApi = {
    getMetadata(): Promise<any | undefined>;
    getProject(projectId: string): Promise<any | undefined>;
    getSequence(projectTitle: string, params: any): Promise<any | undefined>;
    getEvent(params: any): Promise<any | undefined>;
    postEvent(params: any, body: any): Promise<any | undefined>;
    getServiceStates(projectId: string): Promise<any | undefined>;
};
