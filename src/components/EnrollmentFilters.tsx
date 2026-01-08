import React from "react"
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    TextField,
    InputAdornment,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import type { EnrollmentStatus } from '../types/enrollment'

type StatusFilter = EnrollmentStatus | 'all'

type Props = {
    currentFilter: StatusFilter
    onFilterChange: (filter: StatusFilter) => void
    searchQuery: string
    onSearchChange: (query: string) => void
}

export const EnrollmentFilters: React.FC<Props> = ({
    currentFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
}) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            <TextField
                size="small"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{ minWidth: 250 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="status-filter-label">Status</InputLabel>
                <Select<StatusFilter>
                    labelId="status-filter-label"
                    id="status-filter"
                    value={currentFilter}
                    label="Status"
                    onChange={(e) => onFilterChange(e.target.value as StatusFilter)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    )
}
