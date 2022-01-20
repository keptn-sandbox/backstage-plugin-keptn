import React, { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  TextField,
  InputLabel,
  Modal
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
}

const useStyles = makeStyles(() => ({
  label: {
    marginTop: '10px'
  },
  textField: {
    width: '100%',
    padding: '10px 0'
  },
  sendBtn: {
    marginTop: '10px'
  }
}))

export const Delivery = ({
  value,
  deliveryHandler,
  open,
  handleClose
}: {
  value: any
  deliveryHandler: any
  open: boolean
  handleClose: any
}) => {
  const classes = useStyles()
  const [image, setImage] = useState<any>(value.states[0].stages[0].image)
  const [stage, setStage] = useState<any>(value.states[0].stages[0].name)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={{ ...style }}>
        <Typography id='modal-modal-title' variant='h4' component='h2'>
          New delivery
        </Typography>
        <InputLabel variant='standard' className={classes.label}>
          Image
        </InputLabel>
        <TextField
          placeholder='Image'
          value={image}
          className={classes.textField}
          onChange={(e: any) => setImage(e.target.value)}
        />
        <InputLabel
          variant='standard'
          className={classes.label}
          id='stage-label'
        >
          Stage
        </InputLabel>
        <TextField
          placeholder='Image'
          value={stage}
          className={classes.textField}
          onChange={(e: any) => setStage(e.target.value)}
        />
        {/* <Select
          value={stage}
          className={classes.textField}
          onChange={(e: any) => setStage(e.target.value)}
          labelId="stage-label"
        >
          <MenuItem value={'dev'}>Dev</MenuItem>
          <MenuItem value={'staging'}>Staging</MenuItem>
          <MenuItem value={'production'}>Production</MenuItem>
        </Select> */}
        <Button
          className={classes.sendBtn}
          color='primary'
          variant='contained'
          onClick={() =>
            deliveryHandler({
              image,
              stage
            })
          }
        >
          delivery
        </Button>
      </Box>
    </Modal>
  )
}
