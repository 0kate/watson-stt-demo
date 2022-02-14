import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  resultTitle: {
    fontWeight: 'bold',
  },
  tableHeader: {
    fontWeight: 'bold',
  },
});

/**
 * Component for showing spot results.
 *
 * @component
 * @example
 * const [open, setOpen] = useState(true)
 * const spotting = true
 * const onClose = () => setOpen(false)
 * const results = [
 *   {
 *     keyword: 'test',
 *     substrings: [
 *       {
 *         text: 'a test b',
 *         position: 10
 *       }
 *     ]
 *   }
 * ]
 * return (
 *   <SpotResultDialog
 *     open={open}
 *     spotting={spotting}
 *     results={results}
 *     onClose={onClose}
 *   />
 * )
*/
export default function SpotResultDialog(props) {
  const styles = useStyles();

  return (
    <Dialog open={props.open} fullWidth>
      <DialogTitle>
        <Typography className={styles.resultTitle} variant="h5">Results</Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          {props.spotting ? (
            <Grid item xs={12}>
              <CircularProgress />
            </Grid>
          ) : null}
          {props.results.map((result) => (
            <Grid item xs={12}>
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{result.keyword}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography className={styles.tableHeader}>Position</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography className={styles.tableHeader}>Substring</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {result.substrings.map((substring) => (
                        <TableRow>
                          <TableCell>{substring.position}</TableCell>
                          <TableCell>{substring.text}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={props.onClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}
