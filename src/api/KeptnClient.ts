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

import fetch from 'cross-fetch'
// @ts-expect-error
import { KepntApi } from './KepntApi'
// import { ComponentWrapper, MeasuresWrapper } from './types';
import { DiscoveryApi } from '@backstage/core-plugin-api'

export class KeptnClient implements KepntApi {
  discoveryApi: DiscoveryApi

  constructor({ discoveryApi }: { discoveryApi: DiscoveryApi }) {
    this.discoveryApi = discoveryApi
  }

  private async getKeptn<T>(
    path: string,
    query: { [key in string]: any }
  ): Promise<T | undefined> {
    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/keptn`
    const response = await fetch(
      `${apiUrl}/${path}?${new URLSearchParams(query).toString()}`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (response.status === 200) {
      return (await response.json()) as T
    }
    return undefined
  }

  private async postKeptnApi<T>(
    path: string,
    query: { [key in string]: any },
    body: any
  ): Promise<T | undefined> {
    const apiUrl = `${await this.discoveryApi.getBaseUrl('proxy')}/keptn-api`
    const response = await fetch(
      `${apiUrl}/${path}?${new URLSearchParams(query).toString()}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    )
    if (response.status === 200) {
      return (await response.json()) as T
    }
    return undefined
  }

  async getMetadata(): Promise<any | undefined> {
    const component = await this.getKeptn<any>('metadata', {})
    if (!component) {
      return undefined
    }

    return component
  }

  async getProject(projectId: string): Promise<any | undefined> {
    const component = await this.getKeptn<any>(`project/${projectId}`, {})
    if (!component) {
      return undefined
    }

    return component
  }

  async getServiceStates(projectId: string): Promise<any | undefined> {
    const component = await this.getKeptn<any>(
      `project/${projectId}/serviceStates`,
      {}
    )
    if (!component) {
      return undefined
    }

    return component
  }

  async getSequence(projectId: string, params: any): Promise<any | undefined> {
    const component = await this.getKeptn<any>(
      `controlPlane/v1/sequence/${projectId}`,
      params
    )
    if (!component) {
      return undefined
    }

    return component
  }

  async getEvent(params: any): Promise<any | undefined> {
    const component = await this.getKeptn<any>(
      `mongodb-datastore/event`,
      params
    )
    if (!component) {
      return undefined
    }

    return component
  }

  async postEvent(params: any, body: any): Promise<any | undefined> {
    const component = await this.postKeptnApi<any>(`event`, params, body)
    if (!component) {
      return undefined
    }

    return component
  }
}
