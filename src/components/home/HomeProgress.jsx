import React, { useContext } from 'react';
import {
    Button,
    Paper,
    Grid,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../context/Context';

const useStyles = makeStyles((theme) => ({

    genre: {
        width: '23rem',
        [theme.breakpoints.up('xs')]: {
            width: 'auto',
            margin: '0 10px',
        },
        height: '23rem',
        paddingTop: 'inherit',
        alignItems: 'center',
        position: 'relative',
        background: 'none',
        boxShadow: 'none',
    },
    checkButton: {
        color: 'black',
        border: '3px solid black',
        textTransform: 'capitalize',
        margin: 'auto',
    },
    project: {
        position: 'relative',
        display: 'flex',
        height: '23rem',
        padding: 20,
        flexFlow: 'column',
        justifyContent: 'center',
        width: '23rem',
        [theme.breakpoints.down('xs')]: {
            width: '18rem',
        },
        textAlign: 'center',
    },
    selectStyle: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
    }
}));

export default function HomeProgress({ news, termSort }) {
    const classes = useStyles();
    const { handleGenreChange, genre } = useContext(Context);

    let type = [
        'action',
        'adventure',
        'fiction',
        'suspense',
        'love',
        'horror',
        'fantasy'
    ];


    const handleChange = e => {
        handleGenreChange(e);
        termSort(genre);
    }



    return (
        <Grid container>
            <Grid item xl={12} sm={12}>
                <Grid container justify="center" spacing={10}>
                    <Grid item>
                        <Carousel
                            autoPlay={false}
                            animation="fade"
                            indicators={true}
                            navButtonsAlwaysVisible={false}
                            navButtonsAlwaysInvisible={false}
                        >
                            {news.map((news, id) => (
                                <Paper
                                    className={classes.project}
                                    key={id}
                                    elevation={10}
                                    style={{
                                        backgroundColor: "#dfe0d7",
                                    }}
                                >
                                    <h2 style={{ margin: "auto", fontSize: 22 }}>{news.volumeInfo.title}</h2>
                                    <img style={{ margin: "auto" }} src={news.volumeInfo.imageLinks.thumbnail} alt={news.volumeInfo.title} />
                                    <Button size="small" className={classes.checkButton}>
                                        Check it out!
                                    </Button>
                                </Paper>
                            ))}
                        </Carousel>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.genre}>
                            <Typography variant="h6">NEWS FOR GENRES</Typography>
                            <p>Browse the latest news most popular with users!</p>
                            <FormControl className={classes.selectStyle}>
                                <InputLabel id="demo-mutiple-name-label">Select a genre</InputLabel>
                                <Select
                                    style={{
                                        width: '100%'
                                    }}
                                    labelId="demo-customized-select-label"
                                    id="demo-customized-select"
                                    value={genre}
                                    onChange={e => handleChange(e)}
                                >
                                    {type.map((type, i) => (
                                        <MenuItem key={i} value={type}>{type}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>


            </Grid>

        </Grid>
    )
}