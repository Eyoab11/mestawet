import { Models } from "appwrite";
import Loader from "./Loader";
import GridPost from "./GridPost";

type SearchResultsProps = {
    isSearchFetching: boolean;
    searchedPosts: Models.Document[]; // Array of documents
}

const SearchResults = ({ isSearchFetching, searchedPosts }: SearchResultsProps) => {
    if (isSearchFetching) return <Loader />
    
    if (searchedPosts && searchedPosts.length > 0) {
        return (
            <GridPost posts={searchedPosts} />
        )
    }

    return (
        <p className="text-light-4 mt-10 text-center w-full">No results found</p>
    )
}

export default SearchResults;
