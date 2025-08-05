import React, { useState } from "react";
import {
    Typography,
    Button,
    Grid,
    Box,
    Paper,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

function GradeCalc() {
    const [rows, setRows] = useState([]);
    const [newSubject, setNewSubject] = useState('');
    const [newMarks, setNewMarks] = useState('');

    const handleAddSubject = () => {
        if (!newSubject.trim() || !newMarks.trim()) return;

        let grade = 'F';
        const marks = parseFloat(newMarks);

        if (marks > 80 && marks <= 100) grade = 'A';
        else if (marks > 60 && marks <= 80) grade = 'B';
        else if (marks > 40 && marks <= 60) grade = 'C';

        setRows([...rows, { subject: newSubject, marks: newMarks, grade }]);
        setNewSubject('');
        setNewMarks('');
    };

    const calculateGPA = () => {
        if (rows.length === 0) return 0;

        const gradePoints = {
            A: 10,
            B: 8,
            C: 6,
            F: 0
        };

        let totalPoints = 0;
        let count = 0;

        for (const row of rows) {
            if (row.grade in gradePoints) {
                totalPoints += gradePoints[row.grade];
                count++;
            }
        }

        return count === 0 ? 0 : (totalPoints / count).toFixed(2);
    };


    return (
        <Box sx={{ padding: 4, backgroundColor: "#f5f8ff", minHeight: '100vh' }}>
            <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
                Grade Calculator
            </Typography>

            <Grid container spacing={6}>

                <Grid item xs={12} md={6}>
                    <Paper elevation={4} sx={{ padding: 3, borderLeft: "6px solid #1976d2" }}>
                        <Typography variant="h5" gutterBottom color="primary">Enter Subject</Typography>

                        <TextField
                            fullWidth
                            label="Subject"
                            variant="outlined"
                            value={newSubject}
                            onChange={(e) => setNewSubject(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Marks"
                            variant="outlined"
                            value={newMarks}
                            onChange={(e) => setNewMarks(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        <Button
                            variant="contained"
                            onClick={handleAddSubject}
                            fullWidth

                        >
                            + Add Subject
                        </Button>
                    </Paper>
                </Grid>


                <Grid item xs={12} md={6}>
                    <Paper elevation={4}
                        sx={{ padding: 3, borderLeft: "6px solid #2e7d32", width: '100%' }}>

                        <Typography variant="h5" gutterBottom color="success.main">Results</Typography>

                        {rows.length === 0 ?
                            (<Typography color="text.secondary">No subjects added yet.</Typography>)
                            : (
                                <>
                                    <TableContainer>
                                        <Table>
                                            <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
                                                <TableRow>
                                                    <TableCell><strong>Subject</strong></TableCell>
                                                    <TableCell><strong>Marks</strong></TableCell>
                                                    <TableCell><strong>Grade</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row, idx) => (
                                                    <TableRow key={idx}>
                                                        <TableCell>{row.subject}</TableCell>
                                                        <TableCell>{row.marks}</TableCell>
                                                        <TableCell sx={{ fontWeight: 'bold' }}>{row.grade}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                    <Box sx={{ borderTop: '1px solid #ccc', mt: 3, pt: 2 }}>
                                        <Typography variant="h6" color="secondary">
                                            GPA: <strong>{calculateGPA()}</strong>
                                        </Typography>
                                    </Box>
                                </>
                            )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default GradeCalc;
