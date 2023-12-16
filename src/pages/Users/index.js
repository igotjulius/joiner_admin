import React, { Component } from 'react';
import './index.css';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        try {
            const response = await fetch('https://joiner-backend-v4.onrender.com/a/users');
            const data = await response.json();

            this.setState({
                users: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            this.setState({ loading: false });
        }
    };

    render() {
        const { users, loading } = this.state;

        return (
            <div className="table-container">
                <h1>Users Page</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Users;
