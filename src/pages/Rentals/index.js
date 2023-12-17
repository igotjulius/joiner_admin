import React, { Component } from 'react';

class Rentals extends Component {
    constructor() {
        super();
        this.state = {
            rentals: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchRentalsData();
    }

    fetchRentalsData = async () => {
        try {
            const response = await fetch('https://joiner-backend-v4.onrender.com/a/rentals');
            const data = await response.json();

            this.setState({
                rentals: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching rentals data:', error);
            this.setState({ loading: false });
        }
    };
    render() {
        const { rentals, loading } = this.state;
        return (
            <div>
                <h1>Rentals Page</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Rental ID</th>
                                <th>Renter's Name</th>
                                <th>License Plate</th>
                                <th>Car Owner</th>
                                <th>Start Rental Date</th>
                                <th>End Rental Date</th>
                                <th>Price</th>
                                <th>Rental Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rentals.map((rental) => (
                                <tr key={rental._id}>
                                    <td>{rental._id}</td>
                                    <td>{rental.renterName}</td>
                                    <td>{rental.licensePlate}</td>
                                    <td>{rental.vehicleOwner}</td>
                                    <td>{rental.startRental}</td>
                                    <td>{rental.endRental}</td>
                                    <td>{rental.price}</td>
                                    <td>{rental.rentalStatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Rentals;