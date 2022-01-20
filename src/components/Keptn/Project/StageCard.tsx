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
  Avatar,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(theme => ({
  badgeError: {
    backgroundColor: theme.palette.error.main,
  },
  badgeSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  badgeUnknown: {
    backgroundColor: theme.palette.grey[500],
  },
  label: {
    color: theme.palette.text.secondary,
    fontSize: '10px',
    textTransform: 'uppercase',
    marginTop: theme.spacing(1),
    fontWeight: 'bold',
  },
  serviceName: {
    fontSize: '1.2rem',
    textTransform: 'uppercase',
  },
}));

export const StageCard = ({ stage }: { stage: any }) => {
  const classes = useStyles();

  const badgeColor = (service: any) => {
    if (Object.keys(service.lastEventTypes).length === 0) {
      return classes.badgeUnknown;
    }
    const s = service.latestSequence.stages[0];
    if (!s.latestFailedEvent) {
      return classes.badgeSuccess;
    }
    if (s.latestFailedEvent.id === s.latestEvent.id) {
      return classes.badgeError;
    }

    return classes.badgeError;
  };

  const badgeLabel = (service: any) => {
    if (Object.keys(service.lastEventTypes).length === 0) {
      return (
        <React.Fragment>
          <Typography className={classes.serviceName}>
            {service.serviceName}
          </Typography>
          <Typography>-</Typography>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Typography className={classes.serviceName}>
          {service.serviceName}
        </Typography>
        <Typography className={classes.label}>Last Sequence Name</Typography>
        <Typography>{service.latestSequence.name}</Typography>
        <Typography className={classes.label}>Deployed Image</Typography>
        <Typography>{service.deployedImage}</Typography>
      </React.Fragment>
    );
  };

  return (
    <Paper elevation={1}>
      <Card>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            style={{ marginBottom: 10, textTransform: 'uppercase' }}
          >
            {stage.stageName}
          </Typography>
          {stage.services.map((service: any, key: any) => (
            <Grid container wrap="nowrap" spacing={2} key={key}>
              <Grid item>
                <Avatar classes={{ root: badgeColor(service) }}>
                  <InfoIcon />
                </Avatar>
              </Grid>
              <Grid item xs>
                {badgeLabel(service)}
              </Grid>
            </Grid>
          ))}
        </CardContent>
      </Card>
    </Paper>
  );
};
