import React from 'react';
import {
  BrowserRouter as Router,
  withRouter
} from 'react-router-dom';
import ScrollToTop from './ScrollToTop';


import Board from '../containers/BoardContainer';
import NavigatorSelect from './elements/NavigatorSelect';


const NavSelect = (props) => {
  const { options, ...restOfProps} = props;
  return (
    <NavigatorSelect className="form-control" options={options} {...restOfProps} />
  )
}

const NavSelectWithRouter = withRouter(NavSelect);

const getBoardNamesAndIds = (boards) => {
  if (!boards.length) {return []}
  return boards.map((board) => {
    return {
      title: board.title,
      id: board._id
    };
  })
}

const App = ({boards, user}) => {
  return (
    <div className="container-fluid">
      <Router>
        <ScrollToTop>
          <NavSelectWithRouter options={getBoardNamesAndIds(boards)} />
          <Board boards={boards}/>
        </ScrollToTop>
      </Router>
    </div>
  )
};

export default App;