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

import { Avatar, Typography, Grid, Chip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import KeptnLogo from '../../../assets/KeptnLogo'

const useStyles = makeStyles(() => ({
  serviceName: {
    fontSize: '1.2rem',
    textTransform: 'uppercase'
  },
  artifact: {
    marginBottom: '10px'
  },
  image: {
    marginLeft: '10px'
  }
}))

export const Service = ({ service }: { service: any }) => {
  const classes = useStyles()

  return (
    <Grid container wrap='nowrap' spacing={2}>
      <Grid item>
        <Avatar src={KeptnLogo} />
      </Grid>
      <Grid item xs>
        <Typography className={classes.serviceName}>{service.name}</Typography>
        {service.deploymentInformation.map((d: any, key: any) => (
          <React.Fragment key={key}>
            <Typography className={classes.artifact}>
              Last processed artifact:
              <b className={classes.image}>
                {d.image}:{d.version}
              </b>
            </Typography>

            {d.stages.map((s: any) => (
              <Chip label={s.name} key={s.name} />
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  )
}
