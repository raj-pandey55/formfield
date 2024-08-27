import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { deleteService, listAllServices } from "../api/api";
import Sidebar from "./Sidebar";

const ListServices = () => {
  const [services, setServices] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchServices();
  }, [page, rowsPerPage]);

  const fetchServices = async () => {
    try {
      const response = await listAllServices();
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async (serviceId) => {
    try {
      await deleteService(serviceId);
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{flex: 1}}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <p
            style={{
              fontFamily: "Arial",
              fontSize: 24,
              fontWeight: "bold",
              color: "#1976d2",
            }}
          >
            All the services are listed below
          </p>
        </div >
        <div style={{ padding: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/createService"
            >
              Create New Service
            </Button>
          </div>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Provider Address</TableCell>
                    <TableCell>URL</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((service) => (
                      <TableRow key={service._id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>{service.providerAddress}</TableCell>
                        <TableCell>
                          <a
                            href={service.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {service.url}
                          </a>
                        </TableCell>
                        <TableCell>${service.price?.original}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleDelete(service._id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={services.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default ListServices;
