import React, { Component } from 'react';

class Cars extends Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.fetchCarsData();
    }

    fetchCarsData = async () => {
        try {
            const response = await fetch('https://joiner-backend-v4.onrender.com/a/cars');
            const data = await response.json();

            this.setState({
                cars: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching car data:', error);
            this.setState({ loading: false });
        }
    };
    render() {
        const { cars, loading } = this.state;
        return (
            <div>
                <h1>Cars Page</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Car ID</th>
                                <th>Owner Name</th>
                                <th>License Plate</th>
                                <th>Vehicle Type</th>
                                <th>Price</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (
                                <tr key={car._id}>
                                    <td>{car._id}</td>
                                    <td>{car.ownerName}</td>
                                    <td>{car.licensePlate}</td>
                                    <td>{car.vehicleType}</td>
                                    <td>{car.price}</td>
                                    <td>{car.availability}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default Cars;