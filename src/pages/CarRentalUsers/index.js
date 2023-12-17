import React, { Component } from 'react';
import Modal from './deleteModal';
import './index.css';

class CarRentalUsers extends Component {
    constructor() {
        super();
        this.state = {
            cra_users: [],
            loading: true,
            hoveredUserId: null,
            showModal: false,
            userIdToDelete: null
        };
    }

    componentDidMount() {
        this.fetchCraUserData();
    }

    fetchCraUserData = async () => {
        try {
            const response = await fetch('https://joiner-backend-v4.onrender.com/a/craUsers');
            const data = await response.json();

            this.setState({
                cra_users: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching car rental user data:', error);
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
            const response = await fetch(`https://joiner-backend-v4.onrender.com/a/deleteCraUser/${userIdToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const updatedUsers = this.state.users.filter((cra_users) => cra_users._id !== userIdToDelete);
                this.setState({ cra_users: updatedUsers });
            } else {
                console.error('Failed to delete user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
        this.setState({ showModal: false, userIdToDelete: null });
    };


    render() {
        const { cra_users, loading, hoveredUserId, showModal, userIdToDelete } = this.state;
        return (
            <div class="table-container">
                <h1>Car Rental Owners Page</h1>

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
                            {cra_users.map((cra_users) => (
                                <tr
                                key={cra_users._id}
                                onMouseEnter={() => this.handleMouseEnter(cra_users._id)}
                                onMouseLeave={this.handleMouseLeave}
                            >
                                    <td>{cra_users._id}</td>
                                    <td>{cra_users.firstName}</td>
                                    <td>{cra_users.lastName}</td>
                                    <td>{cra_users.email}</td>
                                    <td>
                                            {hoveredUserId === cra_users._id && (
                                                <span
                                                    class="delete-icon"
                                                    onClick={() => this.handleDelete(cra_users._id)}
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

export default CarRentalUsers;