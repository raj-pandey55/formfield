import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getAllEvents, deleteEvent } from "../api/api";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const ListEvents = () => {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    try {
      const data = await getAllEvents(token); // Pass token to get all events function
      setEvents(data.result);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchEvents();
  }, [page, rowsPerPage]);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("token"); // Retrieve token for delete request
    try {
      await deleteEvent(eventId, token); // Pass token to delete function
      setEvents(events.filter((event) => event._id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <h1>Events</h1>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginBottom: "16px" }}
            startIcon={<AddIcon />}
            component={Link}
            to="/createEvent"
          >
            Create New Event
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!loading ? (
                  events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((event) => (
                      <TableRow key={event._id}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.category}</TableCell>
                        <TableCell>{event.location}</TableCell>
                        <TableCell>${event.price.original}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleDelete(event._id)}>
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={events.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListEvents;
