import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import ItemData from "../store/central-store";
import "./Header.css";
import Button from "./Button";

function Header () {
    const itemCtx = useContext(ItemData)
    const navigate = useNavigate();

    function addButtonHandler () {
        navigate('/add');
    }

    return (
        <div className="headerContainer">
             <input
                type="text"
                placeholder="Search by title..."
                value={itemCtx.searchText}
                onChange={itemCtx.handleSearchChange}
                className="searchInput"
            />
            <Button onClick={addButtonHandler}>+Add</Button>
            </div>
        
    ) 
}
export default Header;
