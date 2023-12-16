import React, { Component } from 'react';

class CarRentalUsers extends Component {
    constructor() {
        super();
        this.state = {
            cra_users: [],
            loading: true,
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
    render() {
        const { cra_users, loading } = this.state;
        return (
            <div class="table-container">
                <h1>Car Rental Owners Page</h1>

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
                            {cra_users.map((cra_users) => (
                                <tr key={cra_users._id}>
                                    <td>{cra_users._id}</td>
                                    <td>{cra_users.firstName}</td>
                                    <td>{cra_users.lastName}</td>
                                    <td>{cra_users.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default CarRentalUsers;