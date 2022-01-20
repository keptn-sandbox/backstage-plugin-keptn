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

import { Entity } from '@backstage/catalog-model'
import { useEntity } from '@backstage/plugin-catalog-react'
import { CardContent, Grid, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useAsync } from 'react-use'
import { keptnApiRef } from '../../api'
import {
  KEPTN_SERVICE_KEY_ANNOTATION,
  useProjectKey,
  useServiceKey
} from '../useProjectKey'

import {
  EmptyState,
  InfoCard,
  InfoCardVariants,
  MissingAnnotationEmptyState,
  Progress
} from '@backstage/core-components'

import SyncIcon from '@material-ui/icons/Sync'

import { useApi } from '@backstage/core-plugin-api'
import { Service } from './Service/Service'

const useStyles = makeStyles((theme) => ({
  disabled: {
    backgroundColor: theme.palette.background.default,
    boxSizing: 'border-box',
    width: '100%',
    paddingTop: '10px'
  },
  syncButton: {
    marginTop: '10px',
    marginRight: '10px'
  }
}))

export const ServiceCard = ({
  variant = 'gridItem'
}: {
  entity?: Entity
  variant?: InfoCardVariants
}) => {
  const { entity } = useEntity()
  const classes = useStyles()
  const keptnApi = useApi(keptnApiRef)
  const [value, setValue] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)

  const projectTitle = useProjectKey(entity)
  const serviceName = useServiceKey(entity)

  const loadData = async () => {
    setLoading(true)
    await keptnApi.getServiceStates(projectTitle).then((res: any) => {
      setLoading(false)
      setValue(res)
    })
  }

  useAsync(loadData, [keptnApi, projectTitle])

  return (
    <InfoCard
      title={`Keptn: ${serviceName}@${projectTitle}`}
      action={
        !loading && (
          <IconButton
            aria-label='settings'
            onClick={loadData}
            className={classes.syncButton}
          >
            <SyncIcon />
          </IconButton>
        )
      }
      variant={variant}
      className={loading ? classes.disabled : undefined}
    >
      <CardContent>
        {loading && <Progress />}

        {!loading && !projectTitle && (
          <MissingAnnotationEmptyState
            annotation={KEPTN_SERVICE_KEY_ANNOTATION}
          />
        )}

        {!loading && !serviceName && (
          <MissingAnnotationEmptyState
            annotation={KEPTN_SERVICE_KEY_ANNOTATION}
          />
        )}

        {!loading && projectTitle && serviceName && !value && (
          <EmptyState
            missing='info'
            title='No information to display'
            description={`There is no Keptn project with key '${projectTitle}'.`}
          />
        )}

        {!loading && value && (
          <Grid
            item
            container
            direction='row'
            alignItems='flex-start'
            spacing={2}
          >
            <Service service={value.find((x: any) => x.name === serviceName)} />
          </Grid>
        )}
      </CardContent>
    </InfoCard>
  )
}
