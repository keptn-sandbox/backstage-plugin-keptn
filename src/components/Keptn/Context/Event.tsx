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

import {
  Typography,
  Grid,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Details } from './Details'

const useStyles = makeStyles((theme) => ({
  title: {
    textTransform: 'uppercase',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.2rem'
  },
  greenChip: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    margin: '0',
    textTransform: 'uppercase'
  },
  redChip: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    margin: '0',
    textTransform: 'uppercase'
  }
}))

export const Event = ({ title, event }: { title: string; event: any }) => {
  const classes = useStyles()

  const group = () => {
    return event.reduce((r: any, a: any) => {
      const t = a.type.split('.')
      r[t[3]] = [...(r[t[3]] || []), a]
      return r
    }, {})
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography className={classes.title}>{title}</Typography>
        <Chip
          label={event[0].data.status}
          className={
            event[0].data.status.toLowerCase() === 'succeeded'
              ? classes.greenChip
              : classes.redChip
          }
        />
      </AccordionSummary>
      <AccordionDetails>
        <Grid
          item
          container
          direction='column'
          alignItems='flex-start'
          spacing={2}
        >
          {Object.entries(group()).map(([key, group]) => (
            <Details group={group} title={key} key={key} />
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}
