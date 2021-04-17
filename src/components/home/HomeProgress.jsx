import React, { useContext } from 'react';
import { Button, Paper, Grid, Select, MenuItem,
        FormControl, InputLabel,Typography, Link
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from '../../context/Context';

const useStyles = makeStyles((theme) => ({

    genre: {
        width: '23rem',
        height: 'auto',
        [theme.breakpoints.up('xs')]: {
            width: 'auto',
            margin: '0 10px',
        },
        [theme.breakpoints.up('md')]: {
            height: '23rem',
        },
        paddingTop: 'inherit',
        alignItems: 'center',
        position: 'relative',
        background: 'none',
        boxShadow: 'none',
    },
    checkButton: {
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
        backgroundColor: "#dfe0d7",
    },
    selectStyle: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
        },
    },
    mobileStyle: {
        [theme.breakpoints.down('sm')]: {
            flexWrap: 'wrap-reverse',
        },
    },
    linkStyle: {
        color: 'black',
        "&:hover": {
            color: 'black',
            textDecoration: 'none',
        },
    },
    titleStyle: {
        margin: "auto",
        fontSize: 22,
    },
    marginAuto: {
        margin: 'auto',
    },
    widthSelect: {
        width: '100%',
    },
}));

export default function HomeProgress({ news }) {
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

    return (
        <div>
            <Grid container>
                <Grid item xl={12} sm={12}>
                    <Grid container justify="center" spacing={10} className={classes.mobileStyle}>
                        <Grid item>
                            <Carousel
                                autoPlay={false}
                                animation="fade"
                                indicators={true}
                                navButtonsAlwaysVisible={false}
                                navButtonsAlwaysInvisible={false}
                            >
                                { news !== undefined ? news.map((news, id) => (
                                    <Paper
                                        className={classes.project}
                                        key={id}
                                        elevation={10}
                                    >
                                        <h2 className={classes.titleStyle}>{news.volumeInfo.title}</h2>
                                        <img className={classes.marginAuto} src={news.volumeInfo.imageLinks.thumbnail.replace('http', 'https')} alt={news.volumeInfo.title} />
                                        <Button size="small" className={classes.checkButton}>
                                            <Link
                                                href={news.volumeInfo.canonicalVolumeLink ? news.volumeInfo.canonicalVolumeLink : null}
                                                target="_blank"
                                                className={classes.linkStyle}
                                            >
                                                Check it out!
                                            </Link>
                                        </Button>
                                    </Paper>
                                )) : null}
                            </Carousel>
                        </Grid>
                        <Grid item>
                            <Paper className={classes.genre}>
                                <Typography variant="h6">NEWS FOR GENRES</Typography>
                                <p>Browse the latest news most popular with users!</p>
                                <FormControl className={classes.selectStyle}>
                                    <InputLabel id="demo-mutiple-name-label">Select a genre</InputLabel>
                                    <Select
                                        className={classes.widthSelect}
                                        labelId="demo-customized-select-label"
                                        id="demo-customized-select"
                                        value={genre}
                                        onChange={e => handleGenreChange(e)}
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
        </div>
    )
}
