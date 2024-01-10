import React, { Component } from 'react';
import serverUrl from '../../serverUrl';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
        adjustedDate.setHours(adjustedDate.getHours() - 8);
    
        return adjustedDate.toLocaleDateString('en-US', options);
    };
    
    ExportToPDF = () => {
        const { filteredRentals } = this.state;

        const pdfDoc = new jsPDF();
        
        pdfDoc.text('Reports for Rentals', 20, 15);
        const headers = ['Rental ID', "Renter's Name", 'License Plate', 'Car Owner', 'Start Rental Date', 'End Rental Date', 'Price'];
        const data = filteredRentals.slice().reverse().map((rental) => [
            rental._id,
            rental.renterName,
            rental.licensePlate,
            rental.vehicleOwner,
            this.formatDate(rental.startRental),
            this.formatDate(rental.endRental),
            `Php${rental.price.toFixed(2)}`,
        ]);

        pdfDoc.autoTable({
            head: [headers],
            body: data,
            startY:20,
        });
    
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10) + '_' + currentDate.toTimeString().slice(0, 8);

        pdfDoc.save(`rentals_${formattedDate}.pdf`);
    }

    render() {
        const { filteredRentals, loading, searchInput } = this.state;
        return (
            <div>
                <h1>Rentals Page</h1>
                <div class="row pb-2 pl-3">
                    <div>
                        <label class="search">Search:</label>
                        <input
                            type="text"
                            name="searchInput"
                            value={searchInput}
                            onChange={this.handleSearchChange}
                        />
                    </div>
                    <div class="col-9 d-flex justify-content-end"> 
                        <button onClick={this.ExportToPDF}>Export to PDF</button>
                    </div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRentals.slice().reverse().map((rental)=> (
                                <tr key={rental._id}>
                                    <td>{rental._id}</td>
                                    <td>{rental.renterName}</td>
                                    <td>{rental.licensePlate}</td>
                                    <td>{rental.vehicleOwner}</td>
                                    <td>{this.formatDate(rental.startRental)}</td>
                                    <td>{this.formatDate(rental.endRental)}</td>
                                    <td>&#8369;{rental.price.toFixed(2)}</td>
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