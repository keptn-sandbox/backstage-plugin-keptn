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
import { KEPTN_PROJECT_KEY_ANNOTATION, useProjectKey } from '../useProjectKey'

import {
  EmptyState,
  InfoCard,
  InfoCardVariants,
  MissingAnnotationEmptyState,
  Progress
} from '@backstage/core-components'

import SyncIcon from '@material-ui/icons/Sync'

import { useApi } from '@backstage/core-plugin-api'
import { StageCard } from './Project/StageCard'

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

export const ProjectCard = ({
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

  const loadData = async () => {
    setLoading(true)
    await keptnApi.getProject(projectTitle).then((res) => {
      setLoading(false)
      setValue(res)
    })
  }

  useAsync(loadData, [keptnApi, projectTitle])

  return (
    <InfoCard
      title={`Keptn: ${projectTitle}`}
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
            annotation={KEPTN_PROJECT_KEY_ANNOTATION}
          />
        )}

        {!loading && projectTitle && !value && (
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
            {value.stages.map((stage: any, key: any) => (
              <Grid item md={4} xs={4} key={key}>
                <StageCard stage={stage} />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </InfoCard>
  )
}
