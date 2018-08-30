import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './styles';

function BorrowButton(props) {
  const { classes } = props;
  return (
    <div className={classes.buttonWrapper}>
      <Button variant="contained" className={classes.button}>
        Borrow
      </Button>
    </div>
  );
}



export default withStyles(styles)(BorrowButton);