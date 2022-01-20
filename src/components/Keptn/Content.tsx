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

import { useEntity } from '@backstage/plugin-catalog-react'
import { CardContent, IconButton } from '@material-ui/core'
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
  MissingAnnotationEmptyState,
  Progress
} from '@backstage/core-components'

import SyncIcon from '@material-ui/icons/Sync'
import ArrowUpwardTwoTone from '@material-ui/icons/ArrowUpwardTwoTone'

import { useApi } from '@backstage/core-plugin-api'
import { Context } from './Context/Context'
import { Delivery } from './Context/Delivery'

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
  },
  infoCard: {
    margin: '20px 0'
  }
}))

export const Content = () => {
  const { entity } = useEntity()
  const classes = useStyles()
  const keptnApi = useApi(keptnApiRef)
  const [value, setValue] = useState<any>()
  const [loading, setLoading] = useState<any>(false)
  const [open, setOpen] = React.useState<any>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const projectTitle = useProjectKey(entity)
  const serviceName = useServiceKey(entity)

  const loadData = async () => {
    setLoading(true)
    await keptnApi.getSequence(projectTitle, { pageSize: '10' }).then((res) => {
      setLoading(false)
      setValue(res)
    })
  }

  const deliveryHandler = async (obj: any) => {
    const body = {
      type: `sh.keptn.event.${obj.stage}.delivery.triggered`,
      specversion: '1.0',
      source: 'api',
      contenttype: 'application/json',
      data: {
        project: projectTitle,
        stage: obj.stage,
        service: serviceName,
        configurationChange: {
          values: {
            image: obj.image
          }
        }
      }
    }

    handleClose()
    await keptnApi.postEvent('', body)
  }

  useAsync(loadData, [keptnApi, projectTitle])

  return (
    <React.Fragment>
      <InfoCard
        title={`Keptn: ${serviceName}@${projectTitle}`}
        action={
          !loading && (
            <React.Fragment>
              <IconButton
                aria-label='delivery'
                onClick={handleOpen}
                className={classes.syncButton}
              >
                <ArrowUpwardTwoTone />
              </IconButton>
              <IconButton
                aria-label='settings'
                onClick={loadData}
                className={classes.syncButton}
              >
                <SyncIcon />
              </IconButton>
            </React.Fragment>
          )
        }
        className={loading ? classes.disabled : undefined}
      >
        {/* {!loading && value && (
          <CardContent>Available contexts: {value.states.length}</CardContent>
        )}
      </InfoCard> */}

        {/* <CardContent> */}
        {loading && (
          <CardContent>
            <Progress />
          </CardContent>
        )}

        {!loading && !projectTitle && (
          <CardContent>
            <MissingAnnotationEmptyState
              annotation={KEPTN_SERVICE_KEY_ANNOTATION}
            />
          </CardContent>
        )}

        {!loading && !serviceName && (
          <CardContent>
            <MissingAnnotationEmptyState
              annotation={KEPTN_SERVICE_KEY_ANNOTATION}
            />
          </CardContent>
        )}

        {!loading && projectTitle && serviceName && !value && (
          <CardContent>
            <EmptyState
              missing='info'
              title='No information to display'
              description={`There is no Keptn project with key '${projectTitle}'.`}
            />
          </CardContent>
        )}
      </InfoCard>

      {!loading && value && (
        <>
          {value.states.map((s: any, key: any) => (
            <InfoCard
              key={key}
              title={`Context: ${s.shkeptncontext}`}
              className={classes.infoCard}
            >
              <Context s={s} key={key} project={projectTitle} />
            </InfoCard>
          ))}
        </>
      )}

      {!loading && value && (
        <Delivery
          value={value}
          open={open}
          deliveryHandler={deliveryHandler}
          handleClose={handleClose}
        />
      )}
    </React.Fragment>
  )
}
