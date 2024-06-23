import React, {useState, useEffect, useReducer} from "react";

const ItemData = React.createContext({
    Items: undefined,
    foundItem: undefined,
    dispatchItems: undefined, 
    GETError: undefined,
    activeItemId: undefined,
    setActiveItemId: undefined,
    firstRenderDone: undefined,
    setFirstRenderDone: undefined,
    currentItems: undefined,
    currentPage: undefined,
    setCurrentPage: undefined,
    totalPages: undefined,
    searchText: undefined,
    handleSearchChange: undefined
});

function itemsReducer(state, action) {
    switch(action.task){
        case 'init':
            return action.data;
        case 'add':
            return [...state, action.data];
        case 'delete':
            return state.filter((item)=> item.id !== action.itemId);
        case 'edit':
            console.log(action.activeItemId)
            return [...state.slice(0, action.activeItemId - 1), action.data, ...state.slice(action.activeItemId)];
        default:
            return
    }
}

export function DataProvider (props) {
    const [initItems, setInitItems] = useState(undefined);
    const [items, dispatchItems] = useReducer(itemsReducer, undefined);
    const [activeItemId, setActiveItemId] = useState(undefined);
    const [firstRenderDone, setFirstRenderDone] = useState(false)
    const [GETError, setGETError] = useState(false);
    const [searchText, setSearchText] = useState(""); 

    const filteredItems = items?.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
        setCurrentPage(1); 
    };

    const itemsLength = items !== undefined ? items.length : 0;
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = Math.min(currentPage * itemsPerPage, itemsLength);
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items !== undefined && filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = items ? Math.ceil(items.length / itemsPerPage) : 0;

    const foundItem = items !== undefined ? items.find((item)=> item.id === activeItemId) : undefined;

    async function fetchItems() {
        try {
            const response = await fetch('https://dummyjson.com/products/?limit=0');
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setInitItems(data.products);
        } catch (error) {
            setGETError(true);
        }
    }

    useEffect(()=> {fetchItems();}, []);

    useEffect(() => dispatchItems({task: 'init', data: initItems}), [initItems]);

    return (
        <ItemData.Provider value={{Items: items, foundItem, GETError, dispatchItems, activeItemId, setActiveItemId, firstRenderDone, setFirstRenderDone, currentItems, currentPage, setCurrentPage, totalPages, searchText, handleSearchChange}}>
            {props.children}
        </ItemData.Provider>
    );
};

export default ItemData;