import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FC, memo, useState } from 'react';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { Button, CircularProgress } from '@mui/material';

interface PROPSTABLES {
    fieldcColumn: Array<any>,
    defaultSize: number,
    page: number,
    loading: boolean,
    defaultSort: string,
    rowData: Array<any>,
    callSorted: ({ Sorted, isType }: { Sorted: string, isType: string }) => void
}

const DataTable: FC<PROPSTABLES> = ({
    fieldcColumn,
    loading,
    defaultSize,
    page,
    defaultSort,
    rowData,
    callSorted
}: PROPSTABLES) => {
    const [isSort, setSort] = useState({
        [defaultSort]: true
    })
    const isSorted = ({ sorted }: { sorted: string }) => {
        setSort({
            [sorted as string]: !isSort[sorted]
        })
        callSorted({ Sorted: sorted, isType: isSort[sorted] ? "desc" : 'asc' })
    }
    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow data-testid="render-allTable">
                        <TableCell sx={{ fontWeight: "bold" }} >No.</TableCell>
                        {
                            fieldcColumn.map((item, idx) => {
                                return (
                                    <TableCell
                                        sx={{ fontWeight: "bold" }}
                                        align={item.align}
                                        key={idx}>
                                        <span style={{ display: "flex", justifyContent: "space-between" }}>
                                            {item.fieldName}
                                            {
                                                rowData.length > 1 &&
                                                <Button onClick={() => isSorted({ sorted: item.rowName })} sx={{ display: "inline-table" }} variant='text'>
                                                    {isSort[item.rowName] ? <ArrowUpward color={isSort[item.rowName] !== undefined ? "primary" : "disabled"} /> : <ArrowDownward color="disabled" />}
                                                </Button>
                                            }
                                        </span>
                                    </TableCell>
                                )
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>

                    {
                        loading ? <TableRow>
                            <TableCell align='center' colSpan={fieldcColumn.length + 1}><CircularProgress /></TableCell>
                        </TableRow> :
                            rowData.map((row, idx) => {
                                return (
                                    <TableRow
                                        key={idx}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {(((page - 1) * defaultSize) + idx + 1)}
                                        </TableCell>
                                        {
                                            fieldcColumn.map((items, index) => (
                                                <TableCell key={index} component="th" scope="row">
                                                    {row[items.rowName]}
                                                </TableCell>
                                            ))
                                        }

                                    </TableRow>
                                )
                            })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
const TableGenerator = memo(DataTable, (prevProps, nextProps) => {
    if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
        return true;
    }
    return false;
});

export default TableGenerator