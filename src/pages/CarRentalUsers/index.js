import React, { Component } from 'react';
import Modal from './deleteModal';
import './index.css';
import serverUrl from '../../serverUrl';

class CarRentalUsers extends Component {
    constructor() {
        super();
        this.state = {
            cra_users: [],
            loading: true,
            showModal: false,
            userIdToDelete: null,
            searchInput: '',
        };
    }

    componentDidMount() {
        this.fetchCraUserData();
    }

    fetchCraUserData = async () => {
        try {
            const response = await fetch(`${serverUrl}/a/craUsers`);
            const data = await response.json();

            this.setState({
                cra_users: data,
                filteredCraUsers: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching car rental user data:', error);
            this.setState({ loading: false });
        }
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        this.setState({ searchInput: value }, () => {
            this.filterCraUsers();
        });
    };

    filterCraUsers = () => {
        const { cra_users, searchInput } = this.state;
        const filteredCraUsers = cra_users.filter((cra_users) =>
            Object.values(cra_users).some((field) =>
                field.toString().toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        this.setState({ filteredCraUsers });
    };


    handleDelete = (userId) => {
        this.setState({ showModal: true, userIdToDelete: userId });
    };

    handleCancelDelete = () => {
        this.setState({ showModal: false, userIdToDelete: null });
    };

    handleConfirmDelete = async () => {
        const { userIdToDelete, cra_users } = this.state;
        const userToDelete = cra_users.find(cra_users => cra_users._id === userIdToDelete);

        if (!userToDelete) {
            console.error('User not found');
            return;
        }

        const { password, email } = userToDelete;

        try {
            if (password === '') {
                const resetPasswordResponse = await fetch(`${serverUrl}\resetPassword`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                    }),
                });

                if (resetPasswordResponse.ok) {
                    this.setState({ highlightedUserId: null });
                    window.location.reload();
                } else {
                    console.error('Failed to reset password:', resetPasswordResponse.statusText);
                }
            } else {
                // If user's password is not null, disable the account
                const disableUserResponse = await fetch(`${serverUrl}/a/disableCraUser/${userIdToDelete}`, {
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
        const { filteredCraUsers, searchInput, loading, showModal, userIdToDelete, highlightedUserId } = this.state;
        return (
            <div class="table-container">
                <h1>Car Rental Users Page</h1>

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
                                {filteredCraUsers.map((cra_users) => (
                                    <tr style={{ backgroundColor: highlightedUserId === cra_users._id || cra_users.password === '' ? 'rgba(0, 0, 0, 0.2)' : '' }}>
                                        <td>{cra_users._id}</td>
                                        <td>{cra_users.firstName}</td>
                                        <td>{cra_users.lastName}</td>
                                        <td>{cra_users.email}</td>
                                        <td className="text-center">
                                            <span
                                                onClick={() => this.handleDelete(cra_users._id)}
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Disable/Enable Account"
                                            >
                                                {highlightedUserId === cra_users._id || cra_users.password === '' ? (
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

export default CarRentalUsers;