import {
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  panel: {
    padding: '1.5rem',
  },
  title: {
    fontWeight: 'bold',
    color: '#666666',
  },
});

/**
 * Component for contents panel.
 *
 * @component
 * @example
 * const title = 'sample'
 * return (
 *   <Panel title={title}>
 *     <div>sample</div>
 *   </Panel>
 * )
*/
export default function Panel(props) {
  const styles = useStyles();

  return (
    <Paper className={styles.panel} variant="outlined">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography className={styles.title} variant="h5">{props.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          {props.children}
        </Grid>
      </Grid>
    </Paper>
  );
}
