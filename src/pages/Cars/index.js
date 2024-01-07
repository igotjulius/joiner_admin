import React, { Component } from 'react';
import serverUrl from '../../serverUrl';


class Cars extends Component {
    constructor() {
        super();
        this.state = {
            cars: [],
            loading: true,
            searchInput: '',
        };
    }

    componentDidMount() {
        this.fetchCarsData();
    }

    fetchCarsData = async () => {
        try {
            const response = await fetch(`${serverUrl}/a/cars`);
            const data = await response.json();

            this.setState({
                cars: data,
                filteredCars: data,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching car data:', error);
            this.setState({ loading: false });
        }
    };

    handleSearchChange = (event) => {
        const { value } = event.target;
        this.setState({ searchInput: value }, () => {
            this.filterCars();
        });
    };

    filterCars = () => {
        const { cars, searchInput } = this.state;
        const filteredCars = cars.filter((car) =>
            Object.values(car).some((field) =>
                field.toString().toLowerCase().includes(searchInput.toLowerCase())
            )
        );
        this.setState({ filteredCars });
    };

    render() {
        const { filteredCars, searchInput, loading } = this.state;
        return (
            <div>
                <h1>Cars Page</h1>
                
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
                                <th>Car ID</th>
                                <th>Owner Name</th>
                                <th>License Plate</th>
                                <th>Vehicle Type</th>
                                <th>Price</th>
                                <th>Availability</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCars.map((car) => (
                                <tr key={car._id}>
                                    <td>{car._id}</td>
                                    <td>{car.ownerName}</td>
                                    <td>{car.licensePlate}</td>
                                    <td>{car.vehicleType}</td>
                                    <td>&#8369;{car.price.toFixed(2)}</td>
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