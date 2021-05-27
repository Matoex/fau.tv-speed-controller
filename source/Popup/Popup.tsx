import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
// import {browser, Tabs} from 'webextension-polyfill-ts';
// import './styles.scss';

const useStyles = makeStyles({
  root: {
    width: 250,
  },
  input: {
    width: 42,
  },
});

// function openWebPage(url: string): Promise<Tabs.Tab> {
//   return browser.tabs.create({url});
// }

const Popup: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number | string | Array<number | string>>(30);

  const handleSliderChange = (_event: any, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  return (
    // <div id="popup">
    //   <input className="rangeText" type="number" id="rangeText" value="-1.0"/>
    //   <input type="range" min="0" max="4" step="0.1" defaultValue="1" className="slider" id="playbackSlider"/>
    //   <button id="resetButton">Reset</button>
    //   <button id="copyLinkButton">Copy Video Link</button>
    //   <button id="downloadVideoButton">Download Video</button>
    // </div>

    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Volume
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Popup;
