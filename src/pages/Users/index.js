import React, { Component } from 'react';
import Modal from './deleteModal';
import './index.css';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true,
            hoveredUserId: null,
            showModal: false,
            userIdToDelete: null
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
    
    handleMouseEnter = (userId) => {
        this.setState({ hoveredUserId: userId });
    };

    handleMouseLeave = () => {
        this.setState({ hoveredUserId: null });
    };
    
    handleDelete = (userId) => {
        this.setState({ showModal: true, userIdToDelete: userId });
    };

    handleCancelDelete = () => {
        this.setState({ showModal: false, userIdToDelete: null });
    };

    handleConfirmDelete = async () => {
        const { userIdToDelete } = this.state;
        try {
            const response = await fetch(`https://joiner-backend-v4.onrender.com/a/deleteUser/${userIdToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedUsers = this.state.users.filter((user) => user._id !== userIdToDelete);
                this.setState({ users: updatedUsers });
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        this.setState({ showModal: false, userIdToDelete: null });
    };

    render() {
        const { users, loading, hoveredUserId, showModal, userIdToDelete } = this.state;

        return (
            <div className="table-container">
                <h1>Users Page</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        onMouseEnter={() => this.handleMouseEnter(user._id)}
                                        onMouseLeave={this.handleMouseLeave}
                                    >
                                        <td>{user._id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {hoveredUserId === user._id && (
                                                <span
                                                    class="delete-icon"
                                                    onClick={() => this.handleDelete(user._id)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {showModal && (
                            <Modal
                                userId={userIdToDelete}
                                onCancel={this.handleCancelDelete}
                                onConfirm={this.handleConfirmDelete}
                            />
                        )}
                    </>
                )}
            </div>
        );
    }
}

export default Users;
