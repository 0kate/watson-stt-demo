import React, { useCallback, useState } from 'react';
import {
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Input,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Panel from './panel';
import SpotResultDialog from './spot-result-dialog';
import { API } from '../models';

const useStyles = makeStyles({
  contents: {
    paddingTop: '3rem',
  },
});

/**
 * Component for showing contents.
 *
 * @component
 * @example
 * return (
 *   <Contents />
 * )
*/
export default function Contents() {
  const styles = useStyles();
  const [voiceData, setVoiceData] = useState({ base64: null, type: null });
  const [recognizing, setRecognizing] = useState(false);
  const [recognizeResults, setRecognizeResults] = useState([]);
  const [keywords, setKeywords] = useState(new Set());
  const [openSpotResult, setOpenSpotResult] = useState(false);
  const [spotting, setSpotting] = useState(true);
  const [spotResults, setSpotResults] = useState([]);

  // Event handler for input audio file.
  const handleChangeFile = useCallback((event) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const groups = reader.result.match(/data:(?<type>.*);base64,(?<base64>.*)/).groups;
      setVoiceData({
        base64: groups.base64,
        type: groups.type,
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  }, []);
  // Event handler for click recognize button.
  const handleClickRecognize = useCallback(async () => {
    setRecognizing(true);
    const results = await API.recognize(voiceData.base64, voiceData.type);
    setRecognizeResults(results)
    setRecognizing(false);
  }, [voiceData]);
  // Event handler for click keyword.
  const handleClickWord = useCallback((event) => {
    const word = event.target.innerHTML;
    if (keywords.has(word)) {
      keywords.delete(word)
    } else {
      keywords.add(word);
    }
    setKeywords(new Set(keywords));
  }, [keywords]);
  // Event handler for click spot button.
  const handleClickSpot = useCallback(async (event) => {
    setOpenSpotResult(true);
    setSpotting(true);
    const targetText = recognizeResults[event.currentTarget.dataset.idx].text;
    const results = await API.spot(targetText, Array.from(keywords));
    setSpotResults(results);
    setSpotting(false);
  }, [recognizeResults, keywords]);
  // Event handler for close spot result dialot.
  const onCloseSpotResult = useCallback(() => {
    setOpenSpotResult(false);
  }, []);

  return (
    <React.Fragment>
      <Container className={styles.contents}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Panel title="Recognize">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input type="file" onChange={handleChangeFile} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickRecognize}
                    disabled={recognizing}
                  >
                    RECOGNIZE
                  </Button>
                </Grid>
              </Grid>
            </Panel>
          </Grid>
          <Grid item xs={12}>
            <Panel title="Results">
              <Grid container spacing={2}>
                {recognizing ? (
                  <Grid item xs={12}>
                    <CircularProgress />
                  </Grid>
                ) : null}
                {recognizeResults.map((recognizeResult, i) => (
                  <React.Fragment>
                    <Grid item xs={12} key={i}>
                      <TextField
                        variant="outlined"
                        value={recognizeResult.text}
                        multiline
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography>↓ Select keywords</Typography>
                      {recognizeResult.text.split(' ').map((word) => (
                        <Chip
                          label={word}
                          size="small"
                          color={keywords.has(word) ? 'primary' : 'default'}
                          onClick={handleClickWord}
                        />
                      ))}
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickSpot}
                        disabled={recognizeResults.length === 0}
                        data-idx={i}
                      >
                        SPOT
                      </Button>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Panel>
          </Grid>
        </Grid>
      </Container>
      <SpotResultDialog
        open={openSpotResult}
        spotting={spotting}
        results={spotResults}
        onClose={onCloseSpotResult}
      />
    </React.Fragment>
  );
}
