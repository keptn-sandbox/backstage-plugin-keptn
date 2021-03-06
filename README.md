# Backstage Plugin Keptn

Welcome to the keptn plugin!

## Installation steps

```
yarn add @krateo/backstage-plugin-keptn
```

Add proxy config to the app-config.yaml file

```
proxy:
  "/keptn-api":
    target: http://<your-keptn-instance>/api/v1/
    secure: false
    headers:
      x-token: KEPTN_API_AUTH_TOKEN

  "/keptn":
    target: http:/<your-keptn-instance>/bridge/api/
    secure: false
    headers:
      Authorization: "Basic KEPTN_AUTH_TOKEN"
```

```
// packages/app/src/plugins.ts
export { keptnPlugin } from '@krateo/backstage-plugin-keptn';
```

Add keptn widget to your overview page

```
import {
  EntityKeptnProjectCard,
  EntityKeptnServiceCard,
  isKeptnProjectAvailable,
  isKeptnServiceAvailable,
  EntityKeptnContent,
} from '@krateo/backstage-plugin-keptn';

const overviewContent = (
  <Grid container spacing={3} alignItems="stretch">
  ...
    <EntitySwitch>
      <EntitySwitch.Case if={isKeptnServiceAvailable}>
        <Grid item md={6} xs={6}>
          <EntityKeptnServiceCard />
        </Grid>
      </EntitySwitch.Case>
    </EntitySwitch>
  ...
  </Grid>
);

const serviceEntityPage = (
  <EntityLayoutWrapper>
  ...
    <EntityLayout.Route path="/keptn" title="Keptn">
      <EntityKeptnContent />
    </EntityLayout.Route>
  ...
  </EntityLayoutWrapper>
);

const systemPage = (
  <EntityLayoutWrapper>
    <EntityLayout.Route path="/" title="Overview">
    ...
      <Grid container spacing={3} alignItems="stretch">
        <EntitySwitch>
          <EntitySwitch.Case if={isKeptnProjectAvailable}>
            <Grid item md={12}>
              <EntityKeptnProjectCard />
            </Grid>
          </EntitySwitch.Case>
        </EntitySwitch>
      </Grid>
    ...
    </EntityLayout.Route>
  </EntityLayoutWrapper>
);
```

Add annotation to the yaml config file of a component

```
metadata:
  annotations:
    keptn.sh/project: <your-keptn-project>
    keptn.sh/service: <your-keptn-service>
```

Get and provide env variables in following format

```
KEPTN_API_AUTH_TOKEN: is the token that is generated by the kpetn-api
KEPTN_AUTH_TOKEN: token for keptn ui. username:password in base64 (commonly is keptn:<password>)
```

## How it looks

### System

![image description](https://github.com/krateoplatformops/backstage-plugin-keptn/blob/main/docs/system.png?raw=true)

### Component Overview

![image description](https://github.com/krateoplatformops/backstage-plugin-keptn/blob/main/docs/overview.png?raw=true)

### Keptn Tab

![image description](https://github.com/krateoplatformops/backstage-plugin-keptn/blob/main/docs/tab.png?raw=true)
