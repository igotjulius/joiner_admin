import React, { Component } from 'react';
import Modal from './deleteModal';
import './index.css';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true,
            showModal: false,
            userIdToDelete: null,
            searchInput: '',
        };
    }

    componentDidMount() {
        this.fetchUserData();
    }

    fetchUserData = async () => {
        try {
            const response = await fetch('http://localhost:443/a/users');
            const data = await response.json();

            this.setState({
                users: data,
                filteredUsers: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
            this.setState({ loading: false });
        }
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        this.setState({ searchInput: value }, () => {
            this.filterUsers();
        });
    };

    filterUsers = () => {
        const { users, searchInput } = this.state;
        const filteredUsers = users.filter((users) =>
            Object.values(users).some((field) =>
                field.toString().toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        this.setState({ filteredUsers });
    };


    handleDelete = (userId) => {
        this.setState({ showModal: true, userIdToDelete: userId });
    };

    handleCancelDelete = () => {
        this.setState({ showModal: false, userIdToDelete: null });
    };

    handleConfirmDelete = async () => {
        const { userIdToDelete, users } = this.state;
        const userToDelete = users.find(user => user._id === userIdToDelete);
    
        if (!userToDelete) {
            console.error('User not found');
            return;
        }
    
        const { password, email } = userToDelete;
    
        try {
            if (password === '') {
                const resetPasswordResponse = await fetch('http://localhost:443/resetPassword', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                });
    
                if (resetPasswordResponse.ok) {
                    this.setState({ highlightedUserId: null, users: this.state.set});
                    window.location.reload();
                } else {
                    console.error('Failed to reset password:', resetPasswordResponse.statusText);
                }
            } else {
                // If user's password is not null, disable the account
                const disableUserResponse = await fetch(`http://localhost:443/a/disableUser/${userIdToDelete}`, {
                    method: 'POST',
                });
    
                if (disableUserResponse.ok) {
                    this.setState({ highlightedUserId: userIdToDelete });
                } else {
                    console.error('Failed to disable account:', disableUserResponse.statusText);
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    
        this.setState({ showModal: false, userIdToDelete: null });
    };
    
    

    render() {
        const { filteredUsers, loading, showModal, userIdToDelete, searchInput, highlightedUserId } = this.state;

        return (
            <div className="table-container">
                <h1>Users Page</h1>

                <div>
                    <label class="search">Search:</label>
                    <input
                        type="text"
                        name="searchInput"
                        value={searchInput}
                        onChange={this.handleSearchChange}
                    />
                </div>

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
                                    <th class="text-center">Disable/Enable</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr style={{ backgroundColor: highlightedUserId === user._id || user.password === '' ? 'rgba(0, 0, 0, 0.2)' : '' }}>
                                        <td>{user._id}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            <span
                                                onClick={() => this.handleDelete(user._id)}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Disable/Enable Account"
                                            >
                                                {highlightedUserId === user._id || user.password === '' ? (
                                                    <i className="fas fa-check fa-lg"></i>
                                                ) : (
                                                    <i className="fas fa-ban fa-lg"></i> 
                                                )}
                                            </span>
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
