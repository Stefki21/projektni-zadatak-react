import { useContext } from "react";
import './Footer.css';
import ItemData from "../store/central-store";

function Footer () {
   const itemCtx = useContext(ItemData);

    return (
        <div className="pagination">
        <button
            onClick={() => itemCtx.setCurrentPage(itemCtx.currentPage - 1)}
            disabled={itemCtx.currentPage === 1}
        >
            Previous
        </button>
        <span>{itemCtx.currentPage}</span>
        <button
            onClick={() => itemCtx.setCurrentPage(itemCtx.currentPage + 1)}
            disabled={itemCtx.currentPage >= itemCtx.totalPages}
        >
            Next
        </button>
    </div>
    )
}

export default Footer;