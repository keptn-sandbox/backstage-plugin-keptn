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

import { Avatar, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import InfoIcon from '@material-ui/icons/Info'
import ArrowUpwardTwoTone from '@material-ui/icons/ArrowUpwardTwoTone'
import CheckBox from '@material-ui/icons/CheckBox'
import Search from '@material-ui/icons/Search'
import NewReleases from '@material-ui/icons/NewReleases'
import ArrowDownwardSharp from '@material-ui/icons/ArrowDownwardSharp'

const useStyles = makeStyles((theme) => ({
  grid: {
    margin: '2px 0'
  },
  title: {
    textTransform: 'uppercase',
    minWidth: '150px',
    marginTop: '8px'
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: '10px',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  container: {
    margin: '5px 0'
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

export const Details = ({ group, title }: { group: any; title: string }) => {
  const classes = useStyles()

  const badgeColor = () => {
    return group[0].data.result === 'pass' || !group[0].data.result
      ? classes.greenChip
      : classes.redChip
  }

  const message = (event: any) => {
    if (event.data.message) return event.data.message
    if (event.data?.configurationChange?.values?.image)
      return event.data.configurationChange.values.image
    return event.type
  }

  const icon = () => {
    switch (title) {
      case 'rollback':
        return <ArrowDownwardSharp />
      case 'release':
        return <NewReleases />
      case 'evaluation':
        return <Search />
      case 'deployment':
        return <ArrowUpwardTwoTone />
      case 'test':
        return <CheckBox />
      default:
        return <InfoIcon />
    }
  }

  return (
    <Grid
      item
      container
      wrap='nowrap'
      direction='row'
      alignItems='center'
      spacing={2}
      className={classes.grid}
    >
      <Grid container wrap='nowrap' spacing={2}>
        <Grid item>
          <Avatar className={badgeColor()}>{icon()}</Avatar>
        </Grid>
        <Grid item className={classes.title}>
          <Typography>{title}</Typography>
        </Grid>
        <Grid item>
          {group.map((event: any, key: any) => (
            <div key={key} className={classes.container}>
              <Typography className={classes.label}>{event.time}</Typography>
              <Typography>{message(event)}</Typography>
            </div>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
