'use client';
import SearchBox from "./SearchBox";
import { Box } from "@mui/system";

interface SearchBarProps {
    searchPlaceholder?: string;
    handleSearch?: (searchText: string) => void;
    navigateString?: string;
    initialSearchText?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ searchPlaceholder, handleSearch, navigateString, initialSearchText }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
      <SearchBox 
        searchPlaceholder={searchPlaceholder} 
        handleSearch={handleSearch} 
        navigateString={navigateString} 
        initialSearchText={initialSearchText}
      />
    </Box>
  );
}

export default SearchBar;