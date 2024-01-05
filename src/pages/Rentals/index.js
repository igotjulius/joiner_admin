import React, { Component } from 'react';

class Rentals extends Component {
    constructor() {
        super();
        this.state = {
            rentals: [],
            loading: true,
            searchInput: '',
        };
    }

    componentDidMount() {
        this.fetchRentalsData();
    }

    fetchRentalsData = async () => {
        try {
            const response = await fetch('http://localhost:443/a/rentals');
            const data = await response.json();

            this.setState({
                rentals: data,
                filteredRentals: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching rentals data:', error);
            this.setState({ loading: false });
        }
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        this.setState({ searchInput: value }, () => {
            this.filterRentals();
        });
    };

    filterRentals = () => {
        const { rentals, searchInput } = this.state;
        const filteredRentals = rentals.filter((rental) =>
            Object.values(rental).some((field) =>
                field.toString().toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        this.setState({ filteredRentals });
    };
    formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    render() {
        const { filteredRentals, loading, searchInput } = this.state;
        return (
            <div>
                <h1>Rentals Page</h1>

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
                                <th>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRentals.map((rental) => (
                                <tr key={rental._id}>
                                    <td>{rental._id}</td>
                                    <td>{rental.renterName}</td>
                                    <td>{rental.licensePlate}</td>
                                    <td>{rental.vehicleOwner}</td>
                                    <td>{this.formatDate(rental.startRental)}</td>
                                    <td>{this.formatDate(rental.endRental)}</td>
                                    <td>&#8369;{rental.price.toFixed(2)}</td>
                                    <td>{rental.rentalStatus}</td>
                                    <td>{rental.paymentStatus}</td>
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