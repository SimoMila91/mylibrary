import React from 'react';
import {
  Container,
  makeStyles,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Typography,
  Link
} from '@material-ui/core';
import faq from '../images/unDraw/faq.svg';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center'
  },
  helpImg: {
    height: 200,
    [theme.breakpoints.down('sm')]: {
      height: 100,
    }
  },
  titleStyle: {
    display: 'flex',
    justifyContent: 'center',
  },
  relative: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 50,
    fontFamily: `'New Tegomin', serif`,
    marginBottom: 0,
    lineHeight: 0.8,
    [theme.breakpoints.down('sm')]: {
      fontSize: 20,
    }
  },
  content: {
    width: '100%',
    padding: '7%',
    paddingBottom: '30%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    textAlign: 'left'
  },
  liStyle: {
    display: 'flex',
  },
  left: {
    textAlign: 'left'
  },
  column: {
    flexFlow: 'column'
  }
}));

export default function Faq() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <div className={classes.titleStyle}>
        <div className={classes.relative}>
          <h2 className={classes.title}>FAQs</h2>
        </div>
        <div>
          <img className={classes.helpImg} src={faq} alt="help" />
        </div>
      </div>
      <div className={classes.content}>
        <Accordion>
           <AccordionSummary
             expandIcon={<ExpandMoreIcon />}
             aria-controls="panel1a-content"
             id="panel1a-header"
           >
             <Typography className={classes.heading}>How can I download PDFs and EPUBs with file.acsm extension?</Typography>
           </AccordionSummary>
           <AccordionDetails className={classes.column}>
             <Typography className={classes.left}>
              To download these contents, I suggest you open one of these links:
             </Typography>
             <ul className={classes.left}>
               <li className={classes.liStyle}><Link href="https://www.aranzulla.it/come-aprire-file-acsm-1141122.html">Salvatore Aranzulla</Link></li>
               <li className={classes.liStyle}><Link href="https://ebook.online-convert.com/convert/acsm-to-pdf">ACSM to PDF converter</Link></li>
               <li className={classes.liStyle}><Link href="https://www.epubor.com/convert-acsm-to-epub.html">Convert ACSM to EPUB and Remove DRM</Link></li>
             </ul>
           </AccordionDetails>
       </Accordion>
       <Accordion>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel2a-content"
           id="panel2a-header"
         >
           <Typography className={classes.heading}>Can I cancel my account?</Typography>
         </AccordionSummary>
         <AccordionDetails>
           <Typography>
             To delete your account, go to the settings section and click on delete my account.
           </Typography>
         </AccordionDetails>
       </Accordion>
       <Accordion>
         <AccordionSummary
           expandIcon={<ExpandMoreIcon />}
           aria-controls="panel2a-content"
           id="panel2a-header"
         >
           <Typography className={classes.heading}>Did you forgot your password?</Typography>
         </AccordionSummary>
         <AccordionDetails className={classes.left}>
           <Typography>
             You can change your password by correctly answering the security question.
             <br />Remember that uppercase and lowercase counts.<br />
             If you are already logged in and want to change your password, go to settings and click on change password.

           </Typography>
         </AccordionDetails>
       </Accordion>
      </div>
    </Container>
  )
};