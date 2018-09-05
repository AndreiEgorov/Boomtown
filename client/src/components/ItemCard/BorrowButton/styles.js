const styles = theme => ({
  buttonWrapper: {
    padding: '8px 12px'
  },

  button: {
    margin: theme.spacing.unit,
    backgroundColor: 'none',
    padding: '8px 24px',
    minWidth: '112px',
    fontSize: '0.9375rem',
    minHeight: '40px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxShadow: 'none',
    // backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#d5d5d5'
    }
  },
  input: {
    display: 'none'
  }
})

export default styles
