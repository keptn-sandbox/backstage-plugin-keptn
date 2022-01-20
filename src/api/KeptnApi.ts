/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// import { MetricKey, SonarUrlProcessorFunc } from './types';
import { createApiRef } from '@backstage/core-plugin-api'

export const keptnApiRef = createApiRef<KeptnApi>({
  id: 'plugin.keptn.service'
})

export type KeptnApi = {
  getMetadata(): Promise<any | undefined>
  getProject(projectId: string): Promise<any | undefined>
  getSequence(projectTitle: string, params: any): Promise<any | undefined>
  getEvent(params: any): Promise<any | undefined>
  postEvent(params: any, body: any): Promise<any | undefined>
  getServiceStates(projectId: string): Promise<any | undefined>
}
