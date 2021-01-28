import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import data from './data.json';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: { margin: '10px', overflow: 'hidden' },
	rootDiv: { margin: '10px', overflow: 'hidden', height: '580px' },
	header: {
		backgroundColor: '#80808096',
		padding: theme.spacing(2),
		textAlign: 'center',
		boxShadow: '0 0 0 0 ',
		borderRadius: '0px',
		color: theme.palette.text.secondary,
	},
	buttonRoot: { display: 'flex', justifyContent: 'flex-end' },
	button: { marginRight: '10px', marginBottom: '10px', borderRadius: '10px' },
	paper: {
		cursor: 'pointer',
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	mainDiv: { overflow: 'auto', height: '100%' },
}));

export default function SimpleCard() {
	const [state, setstate] = useState({ filterdList: null });
	const classes = useStyles();
	const { filterdList } = state;
	function sortByDate() {
		const list = data.sort(function (a, b) {
			return new Date(b.date) - new Date(a.date);
		});

		setstate((prevState) => ({ ...prevState, filterdList: list }));
	}
	function sortUpVotes() {
		const list = data.sort((a, b) => parseFloat(b.upVotes) - parseFloat(a.upVotes));
		setstate((prevState) => ({ ...prevState, filterdList: list }));
	}
	if (filterdList === null) {
		sortUpVotes();
	}
	return (
		<div className={classes.rootDiv}>
			<div className={classes.root}>
				<div className={classes.buttonRoot}>
					<Button
						variant="contained"
						className={classes.button}
						color="primary"
						onClick={() => sortUpVotes()}
					>
						Most Upvoted
					</Button>
					<Button className={classes.button} onClick={() => sortByDate()} variant="contained" color="primary">
						Most Recent
					</Button>
				</div>
				<Grid container item xs={12}>
					<Grid item xs={4}>
						<Paper className={classes.header}>Title</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.header}>Upvotes</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper className={classes.header}>Date</Paper>
					</Grid>
				</Grid>
			</div>
			<div className={classes.mainDiv}>
				{filterdList &&
					filterdList.map((obj, index) => (
						<Grid container item xs={12} wrap="nowrap" key={index} spacing={1}>
							<Grid item xs={4}>
								<Paper wrap="nowrap" className={classes.paper}>
									<Typography noWrap>{obj.title}</Typography>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper className={classes.paper}>
									<Typography noWrap>{obj.upVotes}</Typography>
								</Paper>
							</Grid>
							<Grid item xs={4}>
								<Paper className={classes.paper}>
									<Typography noWrap>{new Date(obj.date).toLocaleDateString()}</Typography>
								</Paper>
							</Grid>
						</Grid>
					))}
			</div>
		</div>
	);
}
