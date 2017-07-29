// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { connect } from 'react-redux';
import { roomUrl, ROOT_URL, LOGOUT_USER } from './../constants';
import { dispatchActionAsync } from './../store';
import { getCurrentUserRooms } from './../reducers';

const styles = StyleSheet.create({
  sideBar: {
    display: 'flex',
    flexDirection: 'column',
    background: 'rgb(38,28,37)',
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderRadius: '0 3px 3px 0',
      content: '""',
    },
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

const RoomLink = ({ room }: Object) => (
  <NavLink
    to={roomUrl(room.id)}
    className={css(styles.link)}
    activeClassName={css(styles.activeClassName)}
  >
    <div className={css(styles.badge)}>
      <span>{room.name[0]}</span>
    </div>
  </NavLink>
);

const Sidebar = (props: Object) => {
  const { rooms } = props;

  return (
    <div className={css(styles.sideBar)}>
      {rooms.map((r) => <RoomLink key={r.id} room={r} />)}

      <NavLink
        to={ROOT_URL}
        className={css(styles.link)}
        activeClassName={css(styles.activeClassName)}
      >

        <div className={css(styles.badge)}>
          <span className="fa fa-plus" />
        </div>
      </NavLink>

      <div style={{ flex: '1' }} />

      <button
        className={css(styles.link, styles.logoutButton)}
        onClick={() => dispatchActionAsync({
          type: LOGOUT_USER,
        })}
      >
        <div className={css(styles.badge)}>
          <span className="fa fa-sign-out" />
        </div>
      </button>
    </div>
  );
};

export default connect(
  (state) => ({ rooms: getCurrentUserRooms(state) }),
)(Sidebar);
