import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import Spinner from '../components/elements/Spinner';

const getBoardById = (boards, id) => {
  if (!boards || !boards.length) {return null}
  return boards.find((board) => {
    return board._id === id;
  })
}

const getUserEmails = (users) => {
	return users.map((user) => {
		return user.email;
	})
}

// const displayLists = (listIds) => {
// 	return listIds.map((id) => {
// 		return <ListContainer id={id} />
// 	})
// }

const Board = ({boards, location}) => {
	const id = location.pathname.substring(1);
	const board = id ? getBoardById(boards, id) : boards[0];
	if (!board) {
		return <Spinner />
	}
  return (
  	<div>
    	<h1>{board.title}</h1>
    	<h3>Members:</h3> 
    	<p>{getUserEmails(board.users).join(", ")}</p>
    </div>
  );
}

export default withRouter(Board);
