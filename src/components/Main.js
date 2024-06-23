import React, { useContext} from "react";
import './Main.css';
import ItemData from "../store/central-store";
import Item from "./Item";

function Main() {
    const itemCtx = useContext(ItemData);
    

    return (
        <main>
        {itemCtx.Items !== undefined ? (
            <ul className="itemList">
                <li>
                    <b className="idHeader">ID</b>
                    <b>Title</b>
                    <b>Description</b>
                    <b>Brand</b>
                    <b>Price</b>
                    <b>Category</b>
                    <b>Stock</b>
                    <b>Action</b>
                </li>
                {itemCtx.currentItems !== undefined && itemCtx.currentItems.map((item) => (
                    <li key={item.id}>
                        <Item 
                            id={item.id}
                            title={item.title}
                            desc={item.description}
                            brand={item.brand}
                            price={item.price}
                            category={item.category}
                            stock={item.stock}
                        />
                    </li>
                ))}
            </ul>
        ) : itemCtx.GETError ? (
            <h1 className="errorText">An error occurred</h1>
        ) : (
            <ul className="itemList"><li>Loading...</li></ul>
        )}

    </main>
    );
}

export default Main;
