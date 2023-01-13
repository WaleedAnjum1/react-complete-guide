import { Component } from "react";
// import { useState } from "react";
import User from "./User";

import classes from "./Users.module.css";

class Users extends Component {
  //state initialization
  constructor() {
    super();
    //in class-based-components state is always an object with property named "state"
    this.state = {
      showUsers: true,
    };
  }

  componentDidUpdate() {
    if (this.props.users.length === 0) {
      throw new Error("No users provided");
    }
  }

  toggleUsersHandler() {
    //for changing state setState is called provided by Component class and it also takes an object, it won't override the old state.
    //But react will merge the object we passed with our existing state.
    this.setState((curState) => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        {/* this need to refer to the surrounding class but it wouldn't by default.
            So, to fix this we bind this keyword. Which means that this keyword inside
            of this method is now set to have same context/value as this keyword when
            code is evaluated and then this keyword will refer to this class. */}
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? "Hide" : "Show"} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? "Hide" : "Show"} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
