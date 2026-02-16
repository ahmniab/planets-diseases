'use client';
import React, { use } from 'react'
import { 
    Paper,
    IconButton,
    InputBase,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import util from 'util';

interface SearchBoxProps {
    searchPlaceholder?: string;
    handleSearch?: (searchText: string) => void;
    navigateString?: string;
    initialSearchText?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
    searchPlaceholder = 'ابحث .....', 
    handleSearch, 
    navigateString,
    initialSearchText = ""
}) => {
    const [searchText, setSearchText] = useState(initialSearchText);
    const router = useRouter();

    const executeSearch = () => {
        console.log("Search text:", searchText);
        console.log("Navigate string:", navigateString);
        handleSearch && handleSearch(searchText);
        if ( navigateString ) {
            try {
                router.push(util.format(navigateString, encodeURIComponent(searchText)));
            } catch (error) {}
        }
    }

    return (
        <Paper
            component="form"
            sx={{ 
                p: '2px 6px', 
                display: 'flex', 
                alignItems: 'center', 
                width: 400,
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0)',
                borderRadius: '25px',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: '#e0e0e0',
            }}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                executeSearch();
            }}
        >

      <InputBase
        sx={{ mr: 2, flex: 1 }}
        placeholder={searchPlaceholder}
        inputProps={{ 'aria-label': searchPlaceholder }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <IconButton 
        type="button" 
        sx={{ p: '10px' }} 
        aria-label="search"
        onClick={(e) => {
            executeSearch();
        }}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
    )
}

export default SearchBox;