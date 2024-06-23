import React from "react";
import { useContext } from "react";
import ReactDOM from 'react-dom';
import Button from "../Button";
import ItemData from "../../store/central-store";
import './PopUpScreen.css';
import useInput from "../hooks/use-input";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


function EditScreen (props) {
    const navigate = useNavigate();
    const itemCtx = useContext(ItemData);
    const {
      item: itemTitle,
      itemValid: itemTitleValid,
      itemHasError: itemTitleHasError,
      inputChangeHandler: itemTitleChangeHandler,
      blurChangeHandler: itemTitleBlurChangeHandler,
    } = useInput((value) => value.trim() !== "", props.title);

    const {
      item: itemDesc,
      itemValid: itemDescValid,
      itemHasError: itemDescHasError,
      inputChangeHandler: itemDescChangeHandler,
      blurChangeHandler: itemDescBlurChangeHandler,
    } = useInput((value) => value.trim() !== "", props.desc);

    const {
      item: itemPrice,
      itemValid: itemPriceValid,
      itemHasError: itemPriceHasError,
      inputChangeHandler: itemPriceChangeHandler,
      blurChangeHandler: itemPriceBlurChangeHandler,
    } = useInput((value) => String(value).trim() !== "" && value >= 0, props.price);

    const {
      item: itemBrand,
      itemValid: itemBrandValid,
      itemHasError: itemBrandHasError,
      inputChangeHandler: itemBrandChangeHandler,
      blurChangeHandler: itemBrandBlurChangeHandler,
    } = useInput((value) => value.trim() !== "", props.brand);

    const {
      item: itemCategory,
      itemValid: itemCategoryValid,
      itemHasError: itemCategoryHasError,
      inputChangeHandler: itemCategoryChangeHandler,
      blurChangeHandler: itemCategoryBlurChangeHandler,
    } = useInput((value) => value.trim() !== "", props.category);

    const formIsValid = (itemTitleValid && itemDescValid && itemPriceValid && itemBrandValid && itemCategoryValid);

    const titleInputClasses = itemTitleHasError ? ('error-input') : ''
    const descInputClasses = itemDescHasError ? ('error-input') : ''
    const priceInputClasses = itemPriceHasError ? ('error-input') : ''
    const brandInputClasses = itemBrandHasError ? ('error-input') : ''
    const categoryInputClasses = itemCategoryHasError ? ('error-input') : ''

    function closeButtonHandler(){
        navigate('/');
        itemCtx.setActiveItemId(undefined);
    }

    function formSubmitHandler(event) {
        event.preventDefault();
        if(formIsValid) {
            Swal.fire({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: `Don't save`,
                customClass: {
                    popup: 'custom-swal-popup',
                    backdrop: 'custom-swal-backdrop'
                  }
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire("Saved!", "", "success");
                  navigate('/');
                  fetch(`https://dummyjson.com/products/${itemCtx.activeItemId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                    title: itemTitle,
                    description: itemDesc,
                    brand: itemBrand,
                    price: itemPrice,
                    category: itemCategory
                    })
                })
                .then(res => res.json())
                .then((data) => itemCtx.dispatchItems({task: 'edit', data, activeItemId: itemCtx.activeItemId}));
                itemCtx.setActiveItemId(undefined);
                } else if (result.isDenied) {
                  Swal.fire("Changes are not saved", "", "info");
                  itemCtx.setActiveItemId(undefined);
                  navigate('/');
                }
                
              });
        }else {
          itemTitleBlurChangeHandler();
          itemDescBlurChangeHandler();
          itemPriceBlurChangeHandler();
          itemBrandBlurChangeHandler();
          itemCategoryBlurChangeHandler();
        }
    }

    return ReactDOM.createPortal(
        <React.Fragment>
        <div className="backdrop"></div>
        <div className="EditContainer">
            <h2 className="editTitle">Edit item details</h2>
            <form className="editForm" onSubmit={formSubmitHandler}>
            <label htmlFor="itemTitle">Title</label>
                <input className={titleInputClasses} maxLength={40} type="text" name='itemTitle' id='itemTitle' value={itemTitle} onChange={itemTitleChangeHandler} onBlur={itemTitleBlurChangeHandler}></input>
                {itemTitleHasError && <p className="errorText">Please enter a valid title</p>}
                <label htmlFor="itemDescription">Description</label>
                <input className={descInputClasses} type="text" name='itemDescription' id='itemDescription' value={itemDesc} onChange={itemDescChangeHandler} onBlur={itemDescBlurChangeHandler}></input>
                {itemDescHasError && <p className="errorText">Please enter a valid description</p>}
                <label htmlFor="itemBrand">Brand</label>
                <input className={brandInputClasses} type="text" name='itemBrand' id='itemBrand' value={itemBrand} onChange={itemBrandChangeHandler} onBlur={itemBrandBlurChangeHandler}></input>
                {itemBrandHasError && <p className="errorText">Please enter a valid brand</p>}
                <label htmlFor="itemPrice">Price</label>
                <input className={priceInputClasses} type="number" name='itemPrice' id='itemPrice' value={itemPrice} onChange={itemPriceChangeHandler} onBlur={itemPriceBlurChangeHandler}></input>
                {itemPriceHasError && <p className="errorText">Please enter a valid price</p>}
                <label htmlFor="itemCategory">Category</label>
                <input className={categoryInputClasses} type="text" name='itemCategory' id='itemCategory' value={itemCategory} onChange={itemCategoryChangeHandler} onBlur={itemCategoryBlurChangeHandler}></input>
                {itemCategoryHasError && <p className="errorText">Please enter a valid category</p>}
                <div className="editWindowButtonsContainer">
                    <Button className='closeButton' onClick={closeButtonHandler}>Close</Button>
                    <Button className='submitButton' type='submit'>Submit</Button>
                </div>
                
            </form>
        </div>
        </React.Fragment>, document.getElementById('modals')
        
    )
}

export default EditScreen;