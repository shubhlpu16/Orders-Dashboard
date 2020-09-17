import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import Title from './Title';

export default function Summary(props) {
  const { title1, title2, value1, value2 } = props.summary;
  return (
    <>
      <Title>{title1}:</Title>
      <Typography component="p" color="textSecondary" variant="h5" gutterBottom>
        {value1}
      </Typography>
      <Title>{title2}:</Title>
      <Typography component="p" color="textSecondary" variant="h5" gutterBottom>
        {value2}
      </Typography>
    </>
  );
}

Summary.propTypes = {
  summary: PropTypes.object.isRequired,
};
