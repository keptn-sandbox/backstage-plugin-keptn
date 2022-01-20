import { keptnApiRef, KeptnClient } from './api'
import {
  createApiFactory,
  createComponentExtension,
  createPlugin,
  discoveryApiRef
} from '@backstage/core-plugin-api'
import {
  isProjectAvailable,
  isServiceAvailable
} from './components/useProjectKey'

export const keptnPlugin = createPlugin({
  id: 'keptn',
  apis: [
    createApiFactory({
      api: keptnApiRef,
      deps: {
        discoveryApi: discoveryApiRef
      },
      factory: ({ discoveryApi }) =>
        new KeptnClient({
          discoveryApi
        })
    })
  ]
})

export const EntityKeptnProjectCard = keptnPlugin.provide(
  createComponentExtension({
    name: 'EntityKeptnProjectCard',
    component: {
      lazy: () => import('./components/Keptn').then((m) => m.ProjectCard)
    }
  })
)

export const EntityKeptnServiceCard = keptnPlugin.provide(
  createComponentExtension({
    name: 'EntityKeptnServiceCard',
    component: {
      lazy: () => import('./components/Keptn').then((m) => m.ServiceCard)
    }
  })
)

export const EntityKeptnContent = keptnPlugin.provide(
  createComponentExtension({
    name: 'EntityKeptnContent',
    component: {
      lazy: () => import('./components/Keptn').then((m) => m.Content)
    }
  })
)

export const isKeptnProjectAvailable = isProjectAvailable
export const isKeptnServiceAvailable = isServiceAvailable
