'use client';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    styled,
} from '@mui/material';
import { TableBlockData } from '@/types/disease';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    maxWidth: '100%',
    overflowX: 'auto',
}));

const StyledHeadCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '0.95rem',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.background.default
            : theme.palette.grey[100],
    color: theme.palette.text.primary,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    whiteSpace: 'nowrap',
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    fontSize: '0.95rem',
    lineHeight: 1.6,
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor:
            theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.02)'
                : 'rgba(0, 0, 0, 0.02)',
    },
    '&:last-child td': {
        borderBottom: 0,
    },
}));

const DocTable: React.FC<{ data: TableBlockData }> = ({ data }) => {
    if (!data.content?.length) return null;

    const hasHeadings = data.withHeadings && data.content.length > 1;
    const headRow = hasHeadings ? data.content[0] : null;
    const bodyRows = hasHeadings ? data.content.slice(1) : data.content;

    return (
        <StyledTableContainer /*component={Paper} elevation={0}*/>
            <Table sx={{ minWidth: 300 }}>
                {headRow && (
                    <TableHead>
                        <TableRow>
                            {headRow.map((cell, idx) => (
                                <StyledHeadCell
                                    key={idx}
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                />
                            ))}
                        </TableRow>
                    </TableHead>
                )}
                <TableBody>
                    {bodyRows.map((row, rowIdx) => (
                        <StyledTableRow key={rowIdx}>
                            {row.map((cell, cellIdx) => (
                                <StyledBodyCell
                                    key={cellIdx}
                                    dangerouslySetInnerHTML={{ __html: cell }}
                                />
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

export default DocTable;
