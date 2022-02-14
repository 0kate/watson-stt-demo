import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import {
  makeStyles,
} from '@material-ui/styles';

const useStyles = makeStyles({
  header: {
    background: '#444444',
  },
  title: {
    fontWeight: 'bold',
  },
});

/**
 * Component for showing header.
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
*/
export default function Header() {
  const styles = useStyles();

  return (
    <AppBar className={styles.header} position="sticky">
      <Toolbar>
        <Typography className={styles.title} variant="h5">Voice Recognition</Typography>
      </Toolbar>
    </AppBar>
  );
}
