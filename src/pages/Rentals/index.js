import React, { Component } from 'react';
import serverUrl from '../../serverUrl';

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
            const response = await fetch(`${serverUrl}/a/rentals`);
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
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: 'numeric', 
            hour12: true,
        };
    
        const adjustedDate = new Date(dateString);
        adjustedDate.setHours(adjustedDate.getHours() - 8); // Deduct 8 hours
    
        return adjustedDate.toLocaleDateString('en-US', options);
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
                                {/* <th>Rental Status</th> */}
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
                                    {/* <td>{rental.rentalStatus}</td> */}
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