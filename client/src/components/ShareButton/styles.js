const styles = theme => ({
  circle: {
    margin: theme.spacing.unit
  },

  button: {
    margin: theme.spacing.unit,
    boxShadow: 'none',
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)'
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

export default styles
