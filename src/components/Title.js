import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export default function Title(props) {
  return (
    <Typography component="div" variant="h6" color="inherit" gutterBottom>
      <Box fontWeight="600">{props.children}</Box>
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
};
